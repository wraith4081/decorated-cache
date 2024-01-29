import { createHash } from 'node:crypto';

export default function cached(
    key: 'raw' | 'multi-sha256' | 'single-sha256' = 'raw',
    cacheParent: Map<string, any> = new Map()
) {
    const hash = (args: any[]) => {
        switch (key) {
            case 'raw':
                return JSON.stringify(args);
            case 'multi-sha256':
                return args.map(arg => createHash('sha256').update(JSON.stringify(arg)).digest('hex')).join('-');
            case 'single-sha256':
                return createHash('sha256').update(JSON.stringify(args)).digest('hex');
        }
    }

    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            let key = hash(args);
            if (cacheParent.has(key)) {
                return cacheParent.get(key);
            }
            let result = originalMethod.apply(this, args);
            cacheParent.set(key, result);
            return result;
        }
        return descriptor;
    }
}