interface ECAsset {
    id: string | number;
    name: string;
    url: string;
}

interface ECReadyAssests {
    [key: string | number]: {
        name: string;
        image: HTMLImageElement;
        widthToHeight: number
    };
}

class ImageLoader {

    static prepareAssets(assets: ECAsset[]) {
        return assets.map((asset) => {
           const prom = new Promise((resolve, reject) => {
               const img = new Image();
               img.onload = () => {
                   resolve({
                    id: asset.id,
                    name: asset.name,
                    img
                });
               };
               img.src = asset.url;
           });
           return prom;
        });
    }

    static async loadAssets(assets: ECAsset[]) {
        const promiseArray = ImageLoader.prepareAssets(assets);
        const loadedAssests = await Promise.all(promiseArray);
        return ImageLoader.formatLoadedAssests(loadedAssests);
    }

    static formatLoadedAssests(loadAssets: any): ECReadyAssests {
        const result: ECReadyAssests = {};
        for (const asset of loadAssets) {
            result[asset.id] = {
                name: asset.name,
                image: asset.img,
                widthToHeight: asset.img.width / asset.img.height
            };
        }
        return result;
    }
}

export {
    ImageLoader,
    ECAsset
};