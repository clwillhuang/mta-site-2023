import { Metadata } from 'next'
import Head from 'next/head'

type CustomHeadProps = {
  title: string,
  description?: string,
  children?: JSX.Element[] | JSX.Element,
  disableCrawling?: boolean
}

export default function customizeMetadata({ title, description, children }: CustomHeadProps): Metadata {
  const robots = {
    index: false,
    follow: true,
    nocache: true,
  }
  return {
    title: `${title} | MTA UTSC`,
    description,
    robots 
  }
}