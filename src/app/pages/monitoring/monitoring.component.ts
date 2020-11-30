import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscribableComponent } from 'ngx-subscribable';
import { StorageService } from 'services/storage.service';
import { ZoomSwitchService } from 'services/zoomswitch.service';
import { UserApiService } from 'api/user.api';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';

import { DefaultParams } from 'components/defaults.component';
import { ILiveStatCommon, ICoinParams, ILiveStatWorker } from 'interfaces/common';

import { EAppRoutes } from 'enums/routing';
import { BackendManualApiService } from 'api/backend-manual.api';
import { TCoinName } from 'interfaces/coin';
import { IUserBalanceItem, IWorkerStatsItem } from 'interfaces/backend-query';
import { ESuffix } from 'pipes/suffixify.pipe';
import { FetchPoolDataService } from 'services/fetchdata.service';

enum EWorkerState {
    Normal = 'normal',
    Warning = 'warning',
    Error = 'error,',
}

@Component({
    selector: 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.less'],
})
export class MonitoringComponent extends SubscribableComponent implements OnInit, OnDestroy {
    readonly EAppRoutes = EAppRoutes;
    readonly EWorkerState = EWorkerState;
    readonly ESuffix = ESuffix;

    mainChartCoin: string = '';
    currentBalance: IUserBalanceItem;
    workersList: IWorkerStatsItem[];
    haveBalanceData: boolean = false;
    isLiveLoading: boolean;
    liveStats: ILiveStatCommon;
    liveStatsWorkers: ILiveStatWorker[];
    isBalanceDataLoading: boolean;
    isManualPayoutSending: boolean;

    get isPayBttnActive(): boolean {
        return (
            this.storageService.isReadOnly ||
            this.isBalanceDataLoading ||
            this.currentBalance?.balance === '0.00' ||
            this.currentBalance?.requested !== '0.00' ||
            Object.keys(this.settingsItems).length === 0 ||
            this.settingsItems[this.storageService.currCoin].address === null
        );
    }
    private settingsItems: {
        [coin: string]: {
            name: string;
            address: string;
            payoutThreshold: number;
            autoPayoutEnabled: boolean;
        };
    } = {};
    workerData: ILiveStatWorker;
    workerDataReady: boolean = false;

    get activeCoinName(): string {
        return this.storageService.currCoin;
    }
    set activeCoinName(coin: string | '') {
        this.storageService.currCoin = coin;
    }

    get activeCoinObj(): ICoinParams {
        return this.storageService.coinsObj[this.storageService.currCoin];
    }
    set activeCoinObj(data: ICoinParams) {
        this.storageService.coinsObj[this.storageService.currCoin] = data;
    }

    get isLiveStatLoading(): boolean {
        return this.isLiveLoading;
    }

    get isLoadingBalance(): boolean {
        return this.isBalanceDataLoading;
    }

    get isSending(): boolean {
        return this.isManualPayoutSending;
    }

    private isStarting: boolean;
    private mainCoinApplyTimeoutId: number;

    private historyFetcherTimeoutId: number;
    private changeMainChartCoinTimeoutId: number;
    private subscrip: any;

    constructor(
        private backendManualApiService: BackendManualApiService,
        private zoomSwitchService: ZoomSwitchService,
        private fetchPoolDataService: FetchPoolDataService,
        private storageService: StorageService,
        private userApiService: UserApiService,
        private nzModalService: NzModalService,
        private translateService: TranslateService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.isStarting = true;
        //this.storageService.resetChartsData = true;
        this.storageService.currType = DefaultParams.REQTYPE.USER;
        this.storageService.currentWorker = '';
        this.subs();
        this.fetchPoolDataService.coins({ coin: '', type: 'user', forceUpdate: true });

        //this.haveBalanceData = false;
        //this.isLiveLoading = true;
        //this.isBalanceDataLoading = false;
        //this.storageService.currType = DefaultParams.REQTYPE.USER;
    }

    ngOnDestroy(): void {
        //this.storageService.resetChartsData = true;
        clearTimeout(this.historyFetcherTimeoutId);
        clearTimeout(this.mainCoinApplyTimeoutId);
        this.subscrip.forEach(el => el.unsubscribe());
    }
    onWorkerCurrentCoinChange(coinName: TCoinName): void {
        //TODO
        return;
        /*
        if (
            coinName === "" ||
            this.loading.coins ||
            this.loading.liveStat ||
            this.loading.workerHistStat
            //this.switchWorkerCoin
        )
            return;
        this.loading.workerHistStat = true;
        this.currentCoinNameWorker = coinName;
        //this.fetchWorkerData(coinName, this.currentWorkerId);
        this.fetchPoolDataService.getUserCoinStats(coinName);*/
    }

    onCurrentCoinChange(coin: string): void {
        /*      if (coin === null || coin === '') return;
        if (this.activeCoinName === '') this.activeCoinName = coin;
        this.storageService.coinsObj[coin].is.chartRefresh = true;
        this.setMainCoinTimer(coin);
        this.storageService.coinsObj[this.activeCoinName].is.liveVisible = false;

        this.storageService.coinsObj[coin].is.liveVisible = true;
        this.activeCoinName = coin;
        this.getLiveInfo();
*/
        if (coin === null || coin === '') return;
        if (this.activeCoinName === '') this.activeCoinName = coin;
        this.storageService.coinsObj[coin].is.chartRefresh = true;
        this.setMainCoinTimer(coin);
        this.storageService.coinsObj[this.activeCoinName].is.liveVisible = false;
        this.storageService.coinsObj[this.activeCoinName].is.balanseVisible = false;
        this.storageService.coinsObj[coin].is.liveVisible = true;
        this.storageService.coinsObj[coin].is.blocksVisible = !this.storageService.coinsObj[coin].is
            .algo;
        this.haveBalanceData = !this.storageService.coinsObj[coin].is.algo;
        this.activeCoinName = coin;
        this.getLiveInfo();
        this.getBalanceInfo(coin);
    }

    onWorkerRowClick(workerId: string): void {
        return;
        this.isStarting = true;
        this.storageService.currType = DefaultParams.REQTYPE.WORKER;
        this.storageService.currentWorker = workerId;
        this.fetchPoolDataService.coins({ coin: '', type: 'worker', forceUpdate: true, workerId });
        //TODO
    }

    getWorkerState(time: number): EWorkerState {
        if (time > 30 * 60) {
            return EWorkerState.Error;
        }

        if (time > 15 * 60) {
            return EWorkerState.Warning;
        }

        return EWorkerState.Normal;
    }
    clearWorker(): void {
        this.isStarting = true;
        this.storageService.currType = DefaultParams.REQTYPE.USER;
        this.workerDataReady = false;
        this.storageService.currentWorker = '';
        this.fetchPoolDataService.coins({ coin: '', type: 'user', forceUpdate: true });

        //TODO
        /*
        this.userWorkersStatsHistory = {
            name: '',
            stats: [],
            powerMultLog10: 6,
            coin: '',
            ready: false,
        };
        //this.workerStatsHistoryReady = false;
        //this.userWorkersStatsHistory = null;
        this.storageService.currentCoinInfoWorker = null;
        this.storageService.currentWorkerName = null;
        //this.storageService.needWorkerInint = false;*/
    }

    manualPayout(): void {
        this.isManualPayoutSending = true;
        const coin = this.storageService.currCoin;
        this.backendManualApiService.forcePayout({ coin }).subscribe(
            () => {
                this.nzModalService.success({
                    nzContent: this.translateService.instant('monitoring.pay.success', {
                        coinName: this.storageService.currCoin,
                    }),
                    nzOkText: this.translateService.instant('common.ok'),
                });
                this.isManualPayoutSending = false;
                this.getBalanceInfo(coin);
            },
            () => {
                this.nzModalService.success({
                    nzContent: this.translateService.instant('monitoring.pay.error', {
                        coinName: this.storageService.currCoin,
                    }),
                    nzOkText: this.translateService.instant('common.ok'),
                });
                this.isManualPayoutSending = false;
            },
        );
    }

    private processZoomChange(zoom: string) {
        if (zoom === null) debugger;
        if (zoom === undefined) debugger;
        if (zoom === '') debugger;
        if (this.storageService.coinsList.length === 0 || this.isStarting) return;
        const coinsObj = this.storageService.coinsObj;
        const mainCoinObj = this.storageService.chartMainCoinObj,
            currTime = mainCoinObj.history.chart.label[mainCoinObj.history.chart.label.length - 1],
            currTime2 = parseInt(
                ((new Date(currTime * 1000).setMinutes(0, 0, 0).valueOf() / 1000) as any).toFixed(
                    0,
                ),
            );

        const grI = DefaultParams.ZOOMPARAMS[zoom].groupByInterval;
        const statWindow = DefaultParams.ZOOMPARAMS[zoom].statsWindow;
        const delta = currTime - currTime2;
        let intrevals = Math.round(delta / grI);
        let newTimefrom = 0;

        if (intrevals * grI + currTime2 > currTime) intrevals--;
        if (intrevals === 0) {
            newTimefrom = currTime2 - grI * (statWindow + 1);
        } else {
            newTimefrom = currTime2 - grI * (statWindow + 1 - intrevals);
        }

        const activeCoin = this.activeCoinName;
        coinsObj[activeCoin].is.chartMain = true;
        coinsObj[activeCoin].is.chartRefresh = true;

        coinsObj[activeCoin].history.timeFrom = newTimefrom - grI;
        coinsObj[activeCoin].history.grByInterval = grI;
        coinsObj[activeCoin].history.data = [];
        coinsObj[activeCoin].history.chart.data = [];
        coinsObj[activeCoin].history.chart.label = mainCoinObj.history.chart.label;

        const coins = this.storageService.coinsList.filter(item => item !== activeCoin);

        coins.forEach(item => {
            coinsObj[item].history.chart.label = [];
            coinsObj[item].is.chartMain = false;
            coinsObj[item].is.chartRefresh = false;
        });
        this.isLiveLoading = true;

        this.fetchPoolDataService.live({ coin: activeCoin, type: this.storageService.currType });
    }
    /*
    private processCoins() {
        const coinI =
            this.storageService.coinsList.length > 2 ? this.storageService.coinsList.length - 1 : 0;
        const coin = this.storageService.coinsList[coinI];
        const coinObjIs = this.storageService.coinsObj[coin].is;

        coinObjIs.chartMain;
        coinObjIs.chartMain = true;
        coinObjIs.chartRefresh = true;
        coinObjIs.liveVisible = true;
        coinObjIs.pool = false;
        coinObjIs.worker = false;
        coinObjIs.user = true;
        coinObjIs.balanseVisible = !coinObjIs.algo;
        this.mainChartCoin = coin;
        //this.getLiveInfo();

        this.historyFetcher();
    }*/

    private processCoins() {
        const coinI =
            this.storageService.coinsList.length > 2 ? this.storageService.coinsList.length - 1 : 0;
        this.mainChartCoin = this.storageService.coinsList[coinI];
        this.historyFetcher();
        this.getSettings();
        //this.blocksFetch();
    }

    private getBalanceInfo(coin: string) {
        if (this.activeCoinObj.user.isBalanceLoading) return;
        else this.activeCoinObj.user.isBalanceLoading = true;
        if (!this.activeCoinObj.is.balanseVisible) {
            this.isBalanceDataLoading = true;
            //this.haveBalanceData = true;
            this.getBalanceInfo(coin);
        }
        if (coin === this.activeCoinName) this.fetchPoolDataService.balance({ coin, type: 'user' });
        //        this.isBalanceDataLoading = true;
    }
    private processBalance(coin: string) {
        this.isBalanceDataLoading = false;
        if (this.activeCoinName !== coin) return;
        if (this.activeCoinObj.is.algo) return; //TODO PPDA Users
        this.currentBalance = this.activeCoinObj.user.balance;
    }

    private getLiveInfo() {
        const coinObj = this.storageService.coinsObj;
        const list = this.storageService.coinsList.filter(coin => {
            return coinObj[coin].is.chartRefresh && !coinObj[coin].live.isLoading;
        });
        const workerId = this.storageService.currentWorker;
        list.forEach(coin => {
            if (coinObj[coin].is.liveVisible) this.isLiveLoading = true;
            this.fetchPoolDataService.live({ coin, type: this.storageService.currType, workerId });
        });
    }
    private processLive(coin: string) {
        if (this.isStarting) this.isStarting = false;
        this.isLiveLoading = false;
        this.getHistoryInfo(coin);
        const coinObj = this.storageService.coinsObj[coin];
        if (!coinObj.is.liveVisible) return;
        this.liveStats = coinObj.live.data;
        this.liveStatsWorkers = this.liveStats.miners;
        if (this.storageService.currType === 'worker') {
            this.workerData = this.liveStatsWorkers.filter(
                worker => worker.name === this.storageService.currentWorker,
            )[0];
            this.workerDataReady = true;
        }
    }

    private setMainCoinTimer(coin: string, timer: number = DefaultParams.BASECOINSWITCHTIMER) {
        clearTimeout(this.changeMainChartCoinTimeoutId);
        this.changeMainChartCoinTimeoutId = setTimeout(() => {
            //this.processZoomChange(this.storageService.currZoom);
            //clearTimeout(this.changeMainChartCoinTimeoutId);
            this.changeMainChartCoin(coin);
        }, timer * 1000);
    }

    private changeMainChartCoin(coin: string) {
        const coinsObj = this.storageService.coinsObj;
        const mainChartCoin = this.storageService.chartMainCoinName;

        coinsObj[coin].is.chartMain = true;
        coinsObj[coin].is.chartRefresh = true;

        coinsObj[coin].history.data = [];
        coinsObj[coin].history.chart.data = [];
        coinsObj[coin].history.chart.label = [];
        coinsObj[coin].history.timeFrom = coinsObj[mainChartCoin].history.timeFrom;
        coinsObj[coin].history.grByInterval = coinsObj[mainChartCoin].history.grByInterval;

        const coins = this.storageService.coinsList.filter(item => item !== coin);

        coins.forEach(item => {
            coinsObj[item].is.chartMain = false;
            coinsObj[item].is.chartRefresh = false;
            coinsObj[item].history.data = [];
            coinsObj[item].history.chart.data = [];
            coinsObj[item].history.chart.label = [];
            coinsObj[item].history.timeFrom = coinsObj[mainChartCoin].history.timeFrom;
            coinsObj[item].history.grByInterval = coinsObj[mainChartCoin].history.grByInterval;
        });
        this.isLiveLoading = true;
        const workerId = this.storageService.currentWorker;

        this.fetchPoolDataService.live({
            coin: coin,
            type: this.storageService.currType,
            workerId,
        });
        this.mainChartCoin = coin;
    }

    private getSettings(coin: string = ''): void {
        this.userApiService.userGetSettings().subscribe(({ coins }) => {
            if (coins.length > 0) {
                const coinObj = this.storageService.coinsObj;
                if (coins.length > 2) {
                    const algoCoin = this.storageService.coinsList.find(coin => {
                        return coinObj[coin].is.algo;
                    });
                    const algoData =
                        coins.find(coin => {
                            return coin.name === algoCoin;
                        }) || {};
                    if (algoCoin.length > 0 && Object.keys(algoData).length === 0) {
                        coins.push({
                            name: algoCoin,
                            address: '',
                            payoutThreshold: null,
                            autoPayoutEnabled: false,
                        });
                        //this.disabledCoin = algoCoin;
                    }
                }
                coins.forEach(coin => {
                    if (coin.name.split('.').length > 1) {
                        coin.name = coin.name.split('.')[0];
                    }
                    this.settingsItems[coin.name] = coin;
                });

                //this.settingsItems = coins;
                //if (coin === '') this.currentCoin = coins[coins.length - 1].name;
                //else this.currentCoin = coin;
                //this.isStarting = false;
                //this.onCurrentCoinChange(this.currentCoin);
            }
        });
    }

    private getHistoryInfo(coin: string) {
        const info = this.storageService.coinsObj[coin];
        if (info.history.isLoading || !info.is.chartRefresh) return;
        info.history.isLoading = true;
        const workerId = this.storageService.currentWorker;

        this.fetchPoolDataService.history({ coin, type: this.storageService.currType, workerId });
    }

    private historyFetcher(
        timer: number = DefaultParams.ZOOMPARAMS[this.storageService.currZoom].refreshTimer,
    ) {
        clearTimeout(this.historyFetcherTimeoutId);
        this.historyFetcherTimeoutId = setTimeout(() => {
            this.getLiveInfo();
            this.historyFetcher();
        }, timer * 1000);
    }

    private subs(): void {
        this.subscrip = [
            this.zoomSwitchService.zoomSwitch.subscribe(zoom => {
                if (zoom !== '') this.processZoomChange(zoom);
            }),
            this.fetchPoolDataService.apiGetListOfCoins.subscribe(data => {
                if (data.status && data.type === this.storageService.currType) this.processCoins();
            }),
            this.fetchPoolDataService.apiGetLiveStat.subscribe(data => {
                if (data.status && data.type === this.storageService.currType)
                    this.processLive(data.coin);
            }),
            this.fetchPoolDataService.apiGetUserBalance.subscribe(data => {
                if (data.status && data.type === this.storageService.currType)
                    this.processBalance(data.coin);
            }),
        ];
    }
}
