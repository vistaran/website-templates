export const containerVariants = (delay: 0) => ({
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            duration: 2,
            delay
        }
    }
})

export const tagVariants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            duration: 2.8,
            delay: 0.4
        }
    }
}

export const titleVariants = {
    initial: {
        opacity: 0,
        y: 30,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            duration: 2.2,
        }
    }
}

export const desVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            duration: 2.6,
            delay: 0.2
        }
    }
}