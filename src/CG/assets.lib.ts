import { ECAsset } from './assets/Asset';
import { ECAssetsLoader } from './assets/AssetsLoader';

function createAsset(source: string): ECAsset {
    return new ECAsset(source);
}

const ECAssets = {
    createAsset
};

export {
    ECAsset,
    ECAssetsLoader,
    ECAssets
};
