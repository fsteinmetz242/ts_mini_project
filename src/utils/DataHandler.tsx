import z from "zod";
import {
  ArtResponseSchema,
  ArtPageResponseSchema,
} from "../schemas/ArtSchemas";

export async function getArtworkById(ArtworkId: number) {
  console.log("Fetch(): ", ArtworkId);

  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/${ArtworkId}?fields=id,title,artist_display,date_display,main_reference_number,thumbnail,description`
    );
    if (!response.ok) {
      throw new Error("Fehler beim laden der Daten!");
    }
    const resdata = await response.json();
    const { success, data, error } = ArtResponseSchema.safeParse(resdata);
    if (!success) {
      throw new Error(z.prettifyError(error));
    } else {
      console.log("Data: ", data);
      return data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export async function getPageOfArtwork(PageNum: number) {
  console.log("getPageOfArtwork: ", PageNum);
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${PageNum}&fields=id,title,artist_display,date_display,main_reference_number,thumbnail,description`
    );
    if (!response.ok) {
      throw new Error("Fehler beim laden der Daten!");
    }
    const resdata = await response.json();
    const { success, data, error } = ArtPageResponseSchema.safeParse(resdata);
    if (!success) {
      throw new Error(z.prettifyError(error));
    } else {
      console.log("Data: ", data);
      return data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
//https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number
