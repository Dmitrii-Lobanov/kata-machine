type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = { value: item } as Node<T>

        if (!this.tail) {
            this.length++;
            this.head = node;
            this.tail = node;
            return; 
        }

        this.length++;

        if (!this.head) {
            this.head = node;
            this.head.next = node;
        }

        this.tail.next = node;
        this.tail = node;
    }   

    deque(): T | undefined {
        if (!this?.head) return undefined;

        this.length--;

        const head = this.head;
        this.head = this.head.next;

        return head?.value;
    }

    peek(): T | undefined {
        return this?.head?.value;
    }
}