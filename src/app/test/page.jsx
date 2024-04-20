import Link from 'next/link'

const test = () => {
    return (
        <>
            Test
            {/* pop back navigation */}
            <Link href="/">
                Go Home
            </Link>
        </>
    )
}

export default test