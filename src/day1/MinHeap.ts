export default class MinHeap {
    public length: number;
    private data: number[];


    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }
    delete(): number {
        if (!this.length) return -1;

        const out = this.data[0];

        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }


        this.data[0] = this.data[this.length];

        this.heapifyDown(0);

        return out;
    }

    private heapifyDown(idx: number): void {
        if (idx >= this.length) return;

        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (leftIdx >= this.length) return;

        const value = this.data[idx];
        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];

        if (leftValue > rightValue && value > rightValue) {
            this.data[idx] = rightValue;
            this.data[rightIdx] = value;

            this.heapifyDown(rightIdx);
        } else if (rightValue > leftValue && value > leftValue) {
            this.data[idx] = leftValue;
            this.data[leftIdx] = value;

            this.heapifyDown(leftIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const p = this.parent(idx);
        const parentValue = this.data[p];
        const v = this.data[idx];

        if (v < parentValue) {
            this.data[idx] = parentValue;
            this.data[p] = v;

            this.heapifyUp(p);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}