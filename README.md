# Caching Decorator (decorated-cache)

This module provides a simple, customizable caching solution for methods in TypeScript classes. By utilizing a `Map` to store and retrieve cached results and using the `sha256` hashing algorithm for key generation, it offers a balance between performance and collision resistance.

## Overview

The `cached` function is a decorator factory that wraps around class methods to memoize their results based on the arguments passed to them. It supports three modes of operation for generating cache keys:

- **raw**: Uses a JSON string representation of the method arguments.
- **multi-sha256**: Generates a SHA-256 hash for each argument individually, then concatenates these hashes.
- **single-sha256**: Generates a single SHA-256 hash based on the JSON string representation of all arguments.

By default, it uses the `raw` mode if no specific key generation strategy is provided.

## Installation

To use this module, ensure you have Node.js installed, as it requires the `crypto` module for generating SHA-256 hashes.

## Usage

First, import the decorator:

```javascript
import cached from 'path/to/file';
```

Then, apply it to class methods you wish to cache. You can customize the caching behavior by specifying the key generation strategy (`'raw'`, `'multi-sha256'`, or `'single-sha256'`) and providing an existing `Map` object as a cache store.

### Basic Example (Using Defaults)

```javascript
class Calculator {
  @cached()
  add(a, b) {
    return a + b;
  }
}
```

### Advanced Example (Custom Configuration)

```javascript
const globalCache = new Map();

class AdvancedCalculator {
  @cached('multi-sha256', globalCache)
  complexOperation(a, b) {
    // Simulate a CPU-intensive task
    return a * b + Math.sqrt(a + b);
  }
}
```

## Parameters

- **key**: An optional parameter to specify the cache key generation strategy. Acceptable values are `'raw'`, `'multi-sha256'`, or `'single-sha256'`. The default is `'raw'`.
- **cacheParent**: An optional `Map` object to serve as the cache store. If not provided, a new `Map` will be instantiated.

## How It Works

When a decorated method is called, the decorator generates a cache key based on the method's arguments and the specified strategy. If the cache contains a value for that key, the cached value is returned immediately, bypassing the original method. Otherwise, the original method is invoked, and its result is cached before being returned.

## Considerations

- **Performance**: While caching can significantly improve performance for computationally intensive operations or I/O-bound tasks, the overhead of key generation (especially when using SHA-256 hashing) may influence the overall benefits. Choose the key generation strategy that best fits your use case.
- **Collision Resistance**: The `single-sha256` strategy offers strong collision resistance at the cost of computational overhead. In contrast, the `raw` method may be faster but is susceptible to collisions if complex objects are involved.
- **Cache Invalidation**: This implementation does not provide built-in cache invalidation or expiration mechanisms. It is up to the developer to manage the lifecycle of cached data.

## License

MIT License

Copyright (c) 2024 wraith4081

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.