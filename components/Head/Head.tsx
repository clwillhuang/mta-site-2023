import Head from 'next/head'

type CustomHeadProps = {
    title: string,
    description?: string,
    children?: JSX.Element[] | JSX.Element
}

export default function CustomHead({title, description, children}: CustomHeadProps) {
  return (
    <Head>
        <title>{title} | MTA UTSC</title>
        {description && <meta name="description" content={description}/>}
        <link rel="icon" href="/large-mta-logo.png" />
        {children}
    </Head>
  )
}