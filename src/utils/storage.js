const storage = {
    // 设置localStorage
    set(key, item, time) {
        const setItem = {
            ...item, // 缓存的数据
            effectiveTime: time, // 有效时间  毫秒
            setTime: new Date().getTime() // 存入时间，距 1970 年 1 月 1 日之间的毫秒数
        }
        let storageItem = {}
        try {
            // 先用JSON.stringify转一下
            storageItem = JSON.stringify(setItem)
        } catch (error) {
            // 如果不行就不是对象或者数组对象的类型，就直接赋值
            storageItem = setItem
        }
        localStorage.setItem(key, storageItem)
    },
    // 获取localStorage
    get(key) {
        let getItem = localStorage.getItem(key)
        // console.log(getItem)
        if (!getItem) return getItem
        try {
            getItem = JSON.parse(getItem)
        } catch (error) {
            // 如果不行就不是json的字符串，就直接返回
            // getItem = getItem
        }
        // 如果有startTime的值，说明设置了失效时间
        if (getItem.setTime) {
            const currentTime = new Date().getTime()
            // 何时将值取出减去刚存入的时间，与item.effectiveTime比较，如果大于就是过期了，如果小于或等于就还没过期
            if (currentTime - getItem.setTime > getItem.effectiveTime) {
                // 缓存过期，清除缓存，返回false
                localStorage.removeItem(key)
                return false
            } else {
                // 缓存未过期，返回值
                return getItem
            }
        } else {
            // 如果没有设置失效时间，直接返回值
            return getItem
        }
    },
    // 移除localStorage
    remove(key) {
        localStorage.removeItem(key)
    }
}
export default storage
