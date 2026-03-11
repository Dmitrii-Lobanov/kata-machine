type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;

        this.length++;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;

    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error('Index is more than a list length');
        }

        this.length++;

        if (idx === this.length) {
            this.append(item);
            return;
        }

        if (idx === 0) {
            this.append(item);
            return;
        }

        const node = { value: item } as Node<T>;


        if (!this.head) {
            this.head = node;
            return;
        }

        let curr = this.head;

        for (let i = 0; curr && i < idx; ++i) {
            curr = curr?.next as Node<T>;
        }

        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;

        if (node.prev) {
            node.prev.next = node;
        }
    }
    append(item: T): void {
        const node = { value: item } as Node<T>;

        this.length++;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;

        this.length--;

        for (let i = 0; curr && i < this.length; ++i) {
            curr = curr.next;
            if (curr?.value === item) {
                break;
            }
        }

        if (!curr) {
            return;
        }

        if (this.length === 0) {
            const out = this?.head?.value;

            this.head = this.tail = undefined;
            return out;
        }

        if (curr.prev) {
            curr.prev = curr.next;
        }

        if (curr.next) {
            curr.next = curr.prev;
        }

        
        if (curr === this.head) {
            this.head = curr.next;
        }

        if (curr === this.tail) {
            this.tail = curr.prev;
        }

        curr.prev = curr.next = undefined;

        return curr?.value;
    }

    get(idx: number): T | undefined {
        let curr = this.head;

        for (let i = 0; i < idx; ++i) {
            curr = curr?.next;
        }

        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        let curr = this.head;

        for (let i = 0; i < idx; ++i) {
            curr = curr?.next;
        }

        if (!curr) {
            return undefined;
        }

        
        if (this.length === 0) {
            const out = this?.head?.value;
            
            this.head = this.tail = undefined;
            return out;
        }
        
        this.length--;

        if (curr.prev) {
            curr.prev = curr.next;
        }

        if (curr.next) {
            curr.next = curr.prev;
        }

        
        if (curr === this.head) {
            this.head = curr.next;
        }

        if (curr === this.tail) {
            this.tail = curr.prev;
        }

        curr.prev = curr.next = undefined;

        return curr?.value;
    }
}