class ECAsset {
    protected readonly source: string;
    protected assetName: string;

    constructor(source: string) {
        this.source = source;
    }

    setName(name: string): ECAsset {
        if (name !== this.source) {
            this.assetName = name;
        }
        return this;
    }

    getName(): string {
        return this.assetName || this.source;
    }

    getId(): string {
        return this.source;
    }
}

class ECLoadedAsset extends ECAsset {
    private readonly img: HTMLImageElement;
    constructor(source: string, img: HTMLImageElement) {
        super(source);
        this.img = img;
    }

    image() {
        return this.img;
    }

    widthToHeight() {
        return this.img.width / this.img.height;
    }

}

export {
    ECAsset,
    ECLoadedAsset
};