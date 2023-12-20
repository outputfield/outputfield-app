import * as React from "react"

import MainNav from '@/components/main-nav';
import { getArtistsData } from '@/utils/get-artists';
import ArtistList, { Artist } from '@/components/artist-list';
import { DropContainer } from "@/components/drop-container";
import { ArtistListContainer, ListTypes } from "@/components/artist-list-container";
import { CustomDragLayer } from "@/components/custom-drag-layer";

export interface DragItem {
  type: string
  id: string
  top: number
  left: number
  title: string,
  list: ListTypes
}

export default async function Home() {
  const artists = await getArtistsData() as Artist[];

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-12">
        <MainNav />
        {/* <ArtistList data={artists} /> */}
        <ArtistListContainer artists={artists} />
        <CustomDragLayer />
      </main>
    </>
  )
}
