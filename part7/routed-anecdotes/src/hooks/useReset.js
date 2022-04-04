const useReset = (resetters) => {
    return () => {
        for (const reset of resetters) {
            reset()
        }
    }
}

export default useReset