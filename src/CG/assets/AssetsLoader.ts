import {ECAsset, ECLoadedAsset} from './Asset';

interface ECAssets {
    [key: string]: ECAsset
}

class ECAssetsLoader {
    private readonly assets: ECAssets = {};

    add(assets: ECAsset[]): void {
        for (const asset of assets) {
            this.assets[asset.getId()] = asset;
        }
    }

    get(name: string): ECAsset {
        return this.assets[name];
    }

    private prepareAssets() {
        const assets = Object.keys(this.assets);
        const assets2: ECAsset[] = [];
        for (const key of assets) {
            assets2.push(this.assets[key]);
        }

        return assets2.map((as) => {
            return new Promise((res, rej) => {
                const img = new Image();
                img.onload = () => {
                    res(new ECLoadedAsset(as.getId(), img).setName(as.getName()));
                };
                img.src = as.getId();
            });
        });
    }

    async load() {
        const pArray = this.prepareAssets();
        return await Promise.all(pArray)
    }
}

export {
    ECAssetsLoader
};