import { Metadata } from 'next'

type CustomHeadProps = {
  title: string,
  description?: string,
  children?: JSX.Element[] | JSX.Element,
  disableCrawling?: boolean
}

export default function customizeMetadata({ title, description, children, disableCrawling }: CustomHeadProps): Metadata {
  const robots = {
    index: false,
    follow: true,
    nocache: true,
  }
  return {
    title: `${title} | MTA UTSC`,
    description: description ?? 'MTA',
    robots: disableCrawling ? robots : undefined,
  }
}