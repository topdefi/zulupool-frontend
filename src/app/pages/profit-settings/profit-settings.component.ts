import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserApiService } from 'api/user.api';
import { IUserSettings } from 'interfaces/user';
import { TCoinName } from 'interfaces/coin';
import { StorageService } from 'services/storage.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-profit-settings',
    templateUrl: './profit-settings.component.html',
    styleUrls: ['./profit-settings.component.less'],
})
export class ProfitSettingsComponent implements OnInit {
    profitKeys: (keyof IProfitSett)[] = ['name', 'profitSwitchCoeff'];

    profitItems: IProfitSett[];
    selectedIndex: number;
    currentCoin: TCoinName;
    profitsReady: boolean;
    form: {
        [name: string]: any;
    };
    isSubmitting = false;

    private disabledCoin: string;

    get isDisabled(): boolean {
        return this.currentCoin === this.disabledCoin || this.currentCoin === 'HTR';
    }

    constructor(
        private formBuilder: FormBuilder,
        private userApiService: UserApiService,
        private storageService: StorageService,
        private nzModalService: NzModalService,
        private translateService: TranslateService,
    ) {}

    ngOnInit(): void {
        this.profitsReady = false;
        this.form = {};
        this.getSettings();
    }

    save(item: IProfitSett) {
        if (item.name === '' || item.name === null || item.name === undefined) return;
        if (item.name === 'HTR' || item.name === 'sha256') {
            this.nzModalService.error({
                nzContent: this.translateService.instant('profit.form.cannot', {
                    coin: item.name,
                }),
                nzOkText: this.translateService.instant('common.ok'),
            });
        } else {
            const coinObj = this.storageService.coinsObj[item.name];
            const value: string = this.form[item.name].value.profitSwitchCoeff;
            if (coinObj.is.nameSplitted)
                item.name = coinObj.info.name + '.' + coinObj.info.algorithm;
            const data = {
                profitSwitchCoeff: parseFloat(value.replace(',', '.')),
                coin: item.name,
            };

            this.userApiService.updateProfitSwitchCoeff(data).subscribe(
                () => {
                    this.nzModalService.success({
                        nzContent: this.translateService.instant('profit.form.success', {
                            coin: item.name,
                        }),
                        nzOkText: this.translateService.instant('common.ok'),
                    });
                    this.getSettings();
                },
                () => {
                    this.nzModalService.error({
                        nzContent: this.translateService.instant('profit.form.error', {
                            coin: item.name,
                        }),
                        nzOkText: this.translateService.instant('common.ok'),
                    });
                    this.isSubmitting = false;
                    this.profitsReady = true;
                },
            );
        }
    }
    private getSettings(): void {
        this.userApiService.queryProfitSwitchCoeff().subscribe((data: IProfitSett[]) => {
            if (data.length > 0) {
                const coinObj = this.storageService.coinsObj;
                if (data.length > 2) {
                    const algoCoin = this.storageService.coinsList.find(coin => {
                        return coinObj[coin].is.algo;
                    });
                    const algoData =
                        data.find(coin => {
                            return coin.name === algoCoin;
                        }) || {};
                    if (algoCoin.length > 0 && Object.keys(algoData).length === 0) {
                        data.push({
                            name: algoCoin,
                            profitSwitchCoeff: 0.0,
                        });
                        this.disabledCoin = algoCoin;
                    }
                }
                data.forEach(coin => {
                    if (coin.name.split('.').length > 1) {
                        coin.name = coin.name.split('.')[0];
                    }
                    this.form[coin.name] = this.formBuilder.group({
                        profitSwitchCoeff: [coin.profitSwitchCoeff.toString()],
                    });
                });
            }
            this.profitItems = data;
            //if (coin === '') this.currentCoin = data[data.length - 1].name;
            //else this.currentCoin = coin;
            this.profitsReady = true;
            //this.onCurrentCoinChange(this.currentCoin);
        });
    }
}

export interface IProfitSett {
    name: string;
    profitSwitchCoeff: number;
}
