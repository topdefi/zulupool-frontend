import { IZoomList, IZoom, IExplorerLink, IHistoryItem2, IZoomSettings, ILiveStatWorker, IFetchResponce, ILocalTimeDelta, ILiveStatCommon } from 'interfaces/common';
import { ETime } from 'enums/time';

export class DefaultParams {
    static readonly DNSNAME = 'zulupool.com';

    static readonly GUIVERSION = 'v2.17b';
    static readonly GUISOURCE = 'https://github.com/';

    static readonly COREVERSION = 'v0.9999b';
    static readonly CORESOURCE = 'https://github.com/';

    static readonly SUPPORTMAIL = 'pool@some_mail';
    static readonly DISCORDSERVER = 'https://discord.gg/some_code';

    static readonly ADMINNAME: string = 'admin';
    static readonly GAZERNAME: string = 'observer';
    
    static readonly BASECOINSWITCHTIMER: number = 300;
    static readonly BLOCKSFETCHTIMER: number = 120;
    static readonly DATAUPDATETIMER: number = 120;
    static readonly LIVESTATCACHE: number = 15;
    static readonly HISTORYSTATCACHE: number = 50;
    static readonly MAXHISTORYITEMS: number = 500;
    static readonly MULTIPLYHISTORYDATAFORCHART: number = 3;
    static readonly FETCHRESPONCE: IFetchResponce = { status: false, coin: '', type: '' };
    static readonly DEFAULTTYPE = 'pool';

    
    static readonly BTCWIKI = 'https://en.bitcoin.it/wiki/Difficulty#What_is_the_minimum_difficulty.3F';
    static readonly PPDA = 'https://ppda.';
    static readonly PPDALN = 'https://beta.';
    static readonly PPDAALGO = 'sha256d';
    static readonly STRATUM = 'sha256.';
    static readonly STRATUMS = { HTR: 'sha256.', DOGE: 'scrypt.', ZEC: 'equihash.', ETH: 'etchash.', ETC: 'etchash.' };
    static readonly FASTJOBCOINS = ['DGB.sha256', 'DGB.scrypt'];
    static readonly DEFCOINS = ['BTC', 'BCHN', 'BCHABC', 'XEC', 'BSV', 'DGB', 'XPM', 'FCH', 'HTR', 'DGB.sha256', 'DGB.scrypt', 'LTC', 'DOGE', 'XPM', 'ZEC', 'ZEN', 'ARRR', 'KMD', 'ETC', 'ETH' ];
    static readonly MAINCOINS = ["BTC", "LTC", "ZEC", "XPM", "ETH", "ETC"];
    static readonly PPDALNREWARD = '96.25%';
    static readonly PPDALNREWARDETC = '99%';
    static readonly RECOMMENDEDHTR = '10';
    static readonly ADDREXAMPLES = {
        BTC: [' P2PKH:13xDZX65TFmeFgowMJsJvutmSxUttwkE3f', ' P2SH:3H28N5WuREZ93CNmhWcRcrnykWrMqkhFyWN', ' Bech32:bc1uf5tdn87k2uz7r2kl5zrfww362ch3746lq5vse7'],
        BCHN: [' P2PKH:13xDZX65TFmeFgowMJsJvutmSxUttwkE3f', ' Bech32:qqsxr824tvsq72tv7x43xa346zn7f78pkqssr5lavh'],
        BCHABC: [' P2PKH:13xDZX65TFmeFgowMJsJvutmSxUttwkE3f', ' Bech32:qqsxr824tvsq72tv7x43xa346zn7f78pkqssr5lavh'],
        XEC: [' P2PKH:13xDZX65TFmeFgowMJsJvutmSxUttwkE3f', ' Bech32:qqsxr824tvsq72tv7x43xa346zn7f78pkqfahly82q'],
        BSV: [' P2PKH:13xDZX65TFmeFgowMJsJvutmSxUttwkE3f'],
        XPM: [' P2PKH:AZ6QziuQaHDZkwWr125jSJcs23s7PjgzRb'],
        'DGB.sha256': [' P2PKH:DSMvc9BbM8vtrjPSpMaXmQVXWZsgA92Wxc', ' P2SH:SRsJzf5XL19LDff1paPzRB6p6Va6NmW8Pc', ' Bech32:dgb1q5d0dypakqz326jhuqzsspdkys0dxs5ztckrtl9'],
        'DGB.scrypt': [' P2PKH:DSMvc9BbM8vtrjPSpMaXmQVXWZsgA92Wxc', ' P2SH:SRsJzf5XL19LDff1paPzRB6p6Va6NmW8Pc', ' Bech32:dgb1q5d0dypakqz326jhuqzsspdkys0dxs5ztckrtl9'],
        FCH: [' P2PKH:FV4WF4rRUvqD3ekQudccGGCFHqTTHnpMhu'],
        HTR: [' P2PKH:HTjxTEAUSwZf34nK4YuicfDPocT7JsQwJi'],
        LTC: [' P2PKH:LcgdQuT7TPbo5X2qSfTi4Kbvov3p1uzeAK', ' P2SH:MKYXKMckKUgYX1tTPuEjLtGQ6jiBXhpf39'],
        DOGE: [' P2PKH:DMHMEs1KBhFPuVtwUTCGTtJQSuCmyETxVH'],
        ZEC: [' P2PKH:t1U3gkQ3EJxnsXkSWX8bQgFFySX93AoseNQ'],
        ZEN: [' P2PKH:zneqvx2qmLzdL1JiEismPh3pvN1fUy8DXL9'],
        KMD: [' P2PKH:RUQARw7ng8ya9PjM84NK9jvUpZYqSZ1S6M'],
        ARRR: [' P2PKH:RUQARw7ng8ya9PjM84NK9jvUpZYqSZ1S6M'],
        ETC: [' 0x51022AD3CB0758b78229a8852A009abc4583e264'],
        ETH: [' 0x9Eb6D37F824c52c4b0244F5f6D9d9Be20476959E'],
    };
    static readonly MINIMALPAYMENTS = {
        BTC: 0.001,
        BCHN: 0.005,
        BCHABC: 0.01,
        XEC: 10000,
        BSV: 0.005,
        XPM: 10,
        'DGB.sha256': 10,
        'DGB.scrypt': 10,
        FCH: 1,
        HTR: 1,
        LTC: 0.01,
        DOGE: 100,
        ZEC: 0.01,
        ZEN: 0.1,
        KMD: 0.1,
        ARRR: 0.1,
        ETC: 0.1,
        ETH: 0.05,
    };

    static readonly TARGETLOGINIGNORE = [
        '/userChangePassword',
        '/userChangePasswordInitiate',
        '/userCreate',
        '/userResendEmail',
        '/userAction',
        '/userLogin',
        '/userLogout',
        '/userEnumerateAll',
        '/backendQueryCoins',
        '/backendQueryFoundBlocks',
        '/backendQueryPoolStats',
        '/backendQueryPoolStatsHistory',
        '/backendQueryProfitSwitchCoeff',
        '/backendUpdateProfitSwitchCoeff',
        '/instanceEnumerateAll',
        '/backendPoolLuck'
    ];
    static readonly SESSIONIDIGNORE = [
        '/userChangePasswordInitiate',
        '/userResendEmail',
        '/userLogin',
        '/backendQueryCoins',
        '/backendQueryFoundBlocks',
        '/backendQueryPoolStats',
        '/backendQueryPoolStatsHistory',
        '/instanceEnumerateAll',
        '/backendPoolLuck'
    ];
    static readonly REQTYPE = {
        POOL: 'pool',
        USER: 'user',
        WORKER: 'worker',
    };
    static readonly LOCALTIMEDELTA: ILocalTimeDelta = {
        delta: 0,
        isUpdated: false,
    };
    static readonly NULLSTATHISTORYITEM: IHistoryItem2 = {
        name: '',
        time: 0,
        shareRate: 0,
        shareWork: 0,
        power: 0,
    };
    static readonly NULLSTATLIVEITEM: ILiveStatWorker = {
        lastShareTime: 0,
        name: '',
        power: 0,
        shareRate: 0,
        shareWork: 0,
    };
    static readonly NULLSTATUSERLIVEITEM: ILiveStatCommon = {
        lastShareTime: 0,
        power: 0,
        shareRate: 0,
        shareWork: 0,
        miners: [],
        workers: 0,
    };
    static readonly BLOCKSLINKS: IExplorerLink = {
        BCHABC: 'https://explorer.bitcoinabc.org/block/',
        XEC: 'https://explorer.bitcoinabc.org/block/',
        BSV: 'https://whatsonchain.com/block/',
        XPM: 'https://chainz.cryptoid.info/xpm/block.dws?',
        FCH: 'https://explorer.viawallet.com/fch/block/',
        HTR: 'https://explorer.hathor.network/transaction/',
        ARRR: 'https://explorer.pirate.black/block/',
        DGB: 'https://dgb.tokenview.com/en/block/',
        'DGB.sha256': 'https://dgb.tokenview.com/en/block/',
        'DGB.scrypt': 'https://dgb.tokenview.com/en/block/',
        BTC: 'https://btc.tokenview.com/en/block/',
        BCH: 'https://bch.tokenview.com/en/block/',
        BCHN: 'https://bch.tokenview.com/en/block/',
        LTC: 'https://ltc.tokenview.com/en/block/',
        KMD: 'https://kmd.tokenview.com/en/block/',
        ETH: 'https://eth.tokenview.com/en/block/0x',
        ETC: 'https://etc.tokenview.com/en/block/0x',
        ZEC: 'https://zec.tokenview.com/en/block/',
        ZEN: 'https://zen.tokenview.com/en/block/',
        DOGE: 'https://doge.tokenview.com/en/block/',


    };
    static readonly TXLINKS: IExplorerLink = {
        BCHABC: 'https://explorer.bitcoinabc.org/tx/',
        XEC: 'https://explorer.bitcoinabc.org/tx/',
        BSV: 'https://whatsonchain.com/tx/',
        XPM: 'https://chainz.cryptoid.info/xpm/tx.dws?',
        FCH: 'https://ifblock.io/fch/tx/',
        HTR: 'https://explorer.hathor.network/transaction/',
        ARRR: 'https://explorer.pirate.black/tx/',
        DGB: 'https://dgb.tokenview.com/en/tx/',
        'DGB.sha256': 'https://dgb.tokenview.com/en/tx/',
        'DGB.scrypt': 'https://dgb.tokenview.com/en/tx/',
        BTC: 'https://btc.tokenview.com/en/tx/',
        BCH: 'https://bch.tokenview.com/en/tx/',
        BCHN: 'https://bch.tokenview.com/en/tx/',
        LTC: 'https://ltc.tokenview.com/en/tx/',
        KMD: 'https://kmd.tokenview.com/en/tx/',
        ETH: 'https://eth.tokenview.com/en/tx/0x',
        ETC: 'https://etc.tokenview.com/en/tx/0x',
        ZEC: 'https://zec.tokenview.com/en/tx/',
        ZEN: 'https://zen.tokenview.com/en/tx/',
        DOGE: 'https://doge.tokenview.com/en/tx/',

    };
    static readonly ADDRLINKS: IExplorerLink = {
        BCHABC: 'https://explorer.bitcoinabc.org/address/',
        XEC: 'https://explorer.bitcoinabc.org/address/',
        XPM: 'https://chainz.cryptoid.info/xpm/address.dws?',
        FCH: 'https://ifblock.io/fch/address/',
        HTR: 'https://explorer.hathor.network/address/',
        ARRR: 'https://explorer.pirate.black/address/',
        DGB: 'https://dgb.tokenview.com/en/address/',
        'DGB.sha256': 'https://dgb.tokenview.com/en/address/',
        'DGB.scrypt': 'https://dgb.tokenview.com/en/address/',
        BTC: 'https://btc.tokenview.com/en/address/',
        BCH: 'https://bch.tokenview.com/en/address/',
        BCHN: 'https://bch.tokenview.com/en/address/',
        BSV: 'https://bsv.tokenview.com/en/address/',
        LTC: 'https://ltc.tokenview.com/en/address/',
        KMD: 'https://kmd.tokenview.com/en/address/',
        ETH: 'https://eth.tokenview.com/en/address/0x',
        ETC: 'https://etc.tokenview.com/en/address/0x',
        ZEC: 'https://zec.tokenview.com/en/address/',
        ZEN: 'https://zen.tokenview.com/en/address/',
        DOGE: 'https://doge.tokenview.com/en/address/',
    };

    //static readonly zoom: string = "15M";
    //static readonly zoomList: string[] = ["1M","5M","30M","H1","H4","D","W",];
    static readonly ZOOM: IZoom = {
        pool: '15M',
        user: '5M',
        worker: '5M',
        history: 'D',
    };

    static readonly LUCKPERIODS: string[] = ['Day', 'Three Days', 'Week', 'Decade', 'Month', 'Quarter'];
    static readonly LUCKINTERVALS: number[] = [ETime.Day, ETime.ThreeDays, ETime.Week, ETime.Decade, ETime.Month, ETime.Quarter];
    
    static readonly ZOOMSLIST: IZoomList = {
        pool: ['15M', '30M', 'H1', 'H4', 'D'],
        user: ['5M', '15M', 'H1', 'H4', 'D'],
        worker: ['5M', '15M', 'H1', 'H4', 'D'],
        history: ['D', 'W', 'M'],
    };
    static readonly ZOOMPARAMS: IZoomSettings = {
        '1M': {
            groupByInterval: 1 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 20,
            labelText: 'HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        '2M': {
            groupByInterval: 2 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 20,
            labelText: 'HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        '3M': {
            groupByInterval: 3 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 20,
            labelText: 'HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        '5M': {
            groupByInterval: 5 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 60,
            labelText: 'HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        '10M': {
            groupByInterval: 10 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 60,
            labelText: 'HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        '15M': {
            groupByInterval: 15 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 60,
            labelText: 'HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        '30M': {
            groupByInterval: 30 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 60,
            labelText: 'HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        H1: {
            groupByInterval: 60 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 60,
            labelText: 'dd HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        H4: {
            groupByInterval: 4 * 60 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 60,
            labelText: 'dd HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        D: {
            groupByInterval: 24 * 60 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 60,
            labelText: 'dd HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
        W: {
            groupByInterval: 7 * 24 * 60 * 60,
            statsWindow: 50,
            maxStatsWindow: 60,
            refreshTimer: 60,
            labelText: 'dd HH:mm',
            lastLabelText: 'HH:mm:ss',
        },
    };

    static readonly ANIMALS = [
        'Albatross',
        'Ant',
        'Anteater',
        'Antelope',
        'Aphid',
        'Armadillo',
        'Badger',
        'Barbel',
        'Bat',
        'Bear',
        'Beaver',
        'Bee',
        'Beetle',
        'Biddy',
        'Blackbird',
        'Blindworm',
        'Boa',
        'Bullock',
        'Bumblebee',
        'Camel',
        'Canary',
        'Carp',
        'Caterpillar',
        'Chameleon',
        'Chimpanzee',
        'Cockroach',
        'Cod',
        'Copperhead',
        'Coral Snake',
        'Cottonmouth',
        'Crab',
        'Crocodile',
        'Crow',
        'Cuckoo',
        'Dachshund',
        'Dolphin',
        'Dove',
        'Dragonfly',
        'Duck',
        'Eagle',
        'Earthworm',
        'Eel',
        'Elephant',
        'Falcon',
        'Finch',
        'Flamingo',
        'Flea',
        'Fly',
        'Fox',
        'Frog',
        'Frogspawn',
        'Gadfly',
        'Gazelle',
        'Gecko',
        'Gerbil',
        'Giraffe',
        'Goat',
        'Goldfish',
        'Goose',
        'Grasshopper',
        'Guinea Pig',
        'Gull',
        'Haddock',
        'Halibut',
        'Hamster',
        'Hare',
        'Hare',
        'Harvestman',
        'Hawk',
        'Hedgehog',
        'Hog',
        'Horse',
        'Hyena',
        'Iguana',
        'Jackdaw',
        'Jay',
        'Jellyfish',
        'Kestrel',
        'Kookaburra',
        'Ladybug',
        'Larva',
        'Leech',
        'Lion',
        'Lizard',
        'Llama',
        'Lobster',
        'Lynx',
        'Maggot',
        'Mallard',
        'Mammoth',
        'Marmot',
        'Midge',
        'Millipede',
        'Mink',
        'Mole',
        'Mongoose',
        'Moth',
        'Mouse',
        'Mule',
        'Newt',
        'Nightingale',
        'Nuthatch',
        'Nymph',
        'Ostrich',
        'Otter',
        'Owl',
        'Panda',
        'Parakeet',
        'Parrot',
        'Peacock',
        'Pelican',
        'Penguin',
        'Perch',
        'Pheasant',
        'Pig',
        'Pigeon',
        'Pike',
        'Piranha',
        'Plaice',
        'Platypus',
        'Poisonous',
        'Polar Bear',
        'Polecat',
        'Pony',
        'Porcupine',
        'Prairie Dog',
        'Puma',
        'Python',
        'Racoon',
        'Rat',
        'Raven',
        'Ray',
        'Red Admiral',
        'Reindeer',
        'Rhinoceros',
        'Robin',
        'Rooster',
        'Roundworm',
        'Salamander',
        'Salmon',
        'Saurian',
        'Sawfish',
        'Scallop',
        'Scorpion',
        'Seal',
        'Seal',
        'Shark',
        'Sheep',
        'Shell',
        'Shrimp',
        'Sidewinder',
        'Silkworm',
        'Skunk',
        'Sloth',
        'Slug',
        'Snail',
        'Snake',
        'Sparrow',
        'Spider',
        'Squirrel',
        'Stork',
        'Swallow',
        'Swallowtail',
        'Swan',
        'Swift',
        'Tadpole',
        'Tapeworm',
        'Tarantula',
        'Tiger',
        'Tit',
        'Toad',
        'Tortoise',
        'Trout',
        'Turkey',
        'Turtle',
        'Vulture',
        'Wasp',
        'Weasel',
        'Whale',
        'Wolf',
        'Woodpecker',
        'Wren',
        'Zebra',
    ];
    static readonly STATES = [
        'Adequate',
        'Affable',
        'Affectionate',
        'Aggressive',
        'Banal',
        'Bold',
        'Boring',
        'Brave',
        'Capricious',
        'Carefree',
        'Careful',
        'Caring',
        'Cheerful',
        'Clever',
        'Cocky',
        'Confiding',
        'Cowardly',
        'Cultural',
        'Cunning',
        'Curious',
        'Cynical',
        'Dashing',
        'Desperate',
        'Dexterous',
        'Diplomatic',
        'Distrustful',
        'Dynamic',
        'Easy',
        'Echidny',
        'Educated',
        'Emotional',
        'Envious',
        'Evil',
        'Fair',
        'Fanatical',
        'Frowning',
        'Gambling',
        'Generous',
        'Greedy',
        'Hardworking',
        'Hardy',
        'Impudent',
        'Incorruptible',
        'Indifferent',
        'Ingenious',
        'Insidious',
        'Lazy',
        'Loving',
        'Lucky',
        'Modest',
        'Naive',
        'Nasty',
        'Nervous',
        'Noisy',
        'Orderly',
        'Pathos',
        'Picky',
        'Polite',
        'Positive',
        'Proud',
        'Punctual',
        'Quiet',
        'Reliable',
        'Responsible',
        'Right',
        'Romantic',
        'Secretive',
        'Selfish',
        'Sincere',
        'Slow',
        'Smart',
        'Smiling',
        'Sneaky',
        'Stingy',
        'Strict',
        'Strong-willed',
        'Stubborn',
        'Sullen',
        'Sure',
        'Suspicious',
        'Tedious',
        'Tender',
        'Thoughtful',
        'Timid',
        'Touchy',
        'Unhappy',
        'Unique',
        'Unpredictable',
        'Vulgar',
        'Vulnerable',
        'Wise',
        'Witty',
    ];
}
