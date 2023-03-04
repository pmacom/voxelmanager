import { engine } from "@dcl/sdk/ecs";


interface IWaitQueueItem {
    callback: (() => Promise<void>) | (() => void);
    timeout: number;
    timer?: number;
    isExecuting?: boolean;
}

class WaitInstance {
    private queue: Set<IWaitQueueItem> = new Set();
    constructor() { }
    create(callback: () => void, timeout: number) {
        const value: IWaitQueueItem = {
            callback,
            timeout,
            timer: 0,
            isExecuting: false,
        }
        this.log(`Pushing item`, value)
        if (this.queue.size === 0) this.start();
        this.queue.add(value);
    }
    private update(dt: number) {
        dt *= 1000;
        this.queue.forEach(item => {
            item.timer! += dt;
            if (!item.isExecuting && item.timer! >= item.timeout) {
                item.isExecuting = true;
                item.timer = 0;
                try {
                    item.callback()
                    this.queue.delete(item)
                } catch (err: any) {
                    this.log(`Callback for item`, item, `Threw an error: `, err);
                } finally {
                    this.queue.delete(item);
                }
            }
        })
        if (this.queue.size === 0) this.stop();
    }

    start() {
        this.log(`Starting queue`);
        engine.addSystem(this.update.bind(this), 1, "wait");
    }
    stop(item?: IWaitQueueItem) {
        if (item && this.queue.has(item)) {
            this.queue.delete(item);
            this.log(`Stopping action`, item);
            if (this.queue.size === 0) {
                this.stop();
            }
        } else {
            this.log(`Stopping queue`);
            engine.removeSystem("wait");
        }
    }
    log(...args: any[]) {
        console.log(`[ Wait ]`, ...args);
    }
}

export const Wait = new WaitInstance();