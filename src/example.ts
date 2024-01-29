import cached from '.';

class Fibonacci {
    @cached()
    cached(n: number): number {
        if (n < 2) {
            return 1;
        }
        return this.cached(n - 2) + this.cached(n - 1);
    }

    @cached('multi-sha256')
    cachedMultiSha256(n: number): number {
        if (n < 2) {
            return 1;
        }
        return this.cachedMultiSha256(n - 2) + this.cachedMultiSha256(n - 1);
    }

    uncached(n: number): number {
        if (n < 2) {
            return 1;
        }
        return this.uncached(n - 2) + this.uncached(n - 1);
    }
}

let fib = new Fibonacci();

console.log('Started');

function test(func: () => number) {
    let start = Date.now();
    let result = func();
    let end = Date.now();
    console.log(`result: ${result}, time: ${end - start}ms`);
}

test(() => fib.cached(40));
test(() => fib.cachedMultiSha256(40));
test(() => fib.uncached(40));