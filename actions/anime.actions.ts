"use server"
import axios from "axios";
import { JSDOM } from "jsdom";

type HomeType = {
    id: string,
    title: string;
    type: string,
    poster: string
}[]

const getDocument = async (link: string) => {
    try {
        const response = await fetch(link);
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;
        return document;
    } catch (error: any) {
        return error.message
    }
}

export const home = async () => {
    try {
        const homeArray: HomeType = []
        const titleArray: string[] = []
        const idArray: string[] = []
        const typeArray: string[] = []
        const posterArray: string[] = []
        const document = await getDocument("https://aniwatch.to/home");
        document.querySelectorAll(".film_list-wrap > .flw-item > .film-detail > .film-name > .dynamic-name").forEach((e: any) => idArray.push(e.getAttribute("href")!))
        document.querySelectorAll(".film_list-wrap > .flw-item > .film-detail > .film-name").forEach((e: any) => titleArray.push(e.textContent!));
        document.querySelectorAll(".film_list-wrap > .flw-item > .film-detail > .fd-infor > .fdi-item:not(.fdi-duration)").forEach((e: any) => typeArray.push(e.textContent!));
        document.querySelectorAll(".film_list-wrap > .flw-item > .film-poster > .film-poster-img").forEach((e: any) => posterArray.push(e.getAttribute("data-src")!));

        for (let i = 0; i < idArray.length; i++) {
            const data = {
                id: idArray[i],
                title: titleArray[i],
                type: typeArray[i],
                poster: posterArray[i],
            }
            homeArray.push(data)
        }

        return homeArray
    } catch (error: any) {
        console.log(error.message)
    }
}

export const search = async (query: string) => {
    try {
        const searchArray: HomeType = []
        const titleArray: string[] = []
        const idArray: string[] = []
        const typeArray: string[] = []
        const posterArray: string[] = []
        if (!query) return { message: "Please enter a query to search", success: false }
        const document = await getDocument(`https://aniwatch.to/search?keyword=${query}`);
        document.querySelectorAll(".film_list-wrap > .flw-item > .film-detail > .film-name > .dynamic-name").forEach((e: any) => idArray.push(e.getAttribute("href")!))
        document.querySelectorAll(".film_list-wrap > .flw-item > .film-detail > .film-name").forEach((e: any) => titleArray.push(e.textContent!));
        document.querySelectorAll(".film_list-wrap > .flw-item > .film-detail > .fd-infor > .fdi-item:not(.fdi-duration)").forEach((e: any) => typeArray.push(e.textContent!));
        document.querySelectorAll(".film_list-wrap > .flw-item > .film-poster > .film-poster-img").forEach((e: any) => posterArray.push(e.getAttribute("data-src")!));

        for (let i = 0; i < idArray.length; i++) {
            const data = {
                id: idArray[i],
                title: titleArray[i],
                type: typeArray[i],
                poster: posterArray[i],
            }
            searchArray.push(data)
        }

        return searchArray
    } catch (error: any) {
        return error.message;
    }
}

export const details = async (id: string) => {
    try {
        const document = await getDocument(`https://aniwatch.to/${id}`)
        const image = document.querySelector(".anis-content > .anisc-poster >  .film-poster > .film-poster-img")?.getAttribute("src");
        const title = document.querySelector(".anisc-detail > .film-name.dynamic-name")?.textContent;
        const description = document.querySelector(".text")?.textContent;
        const watchId = document.querySelector(".film-buttons > .btn.btn-radius.btn-primary.btn-play")?.getAttribute("href")?.slice(7);
        const type = document.querySelector(".anisc-detail > .film-stats > .tick > .tick-item.tick-quality")?.textContent;
        const PG = document.querySelector(".anisc-detail > .film-stats > .tick > .tick-item.tick-pg")?.textContent;
        const time = document.querySelector(".anisc-detail > .film-stats > .tick > .item")?.textContent;
        return { id: watchId, image, title, description, details: { type, PG, duration: time } }
    } catch (error: any) {
        return error.message
    }
}

export const streamingId = async (id: string) => {
    try {
        const episodesAjax = await axios.get(
            `https://aniwatch.to/ajax/v2/episode/list/${id.split("-").pop()}`,
            {
                headers: {
                    Accept: 'ACCEPT_HEADER',
                    "User-Agent": 'USER_AGENT_HEADER',
                    "X-Requested-With": "XMLHttpRequest",
                    "Accept-Encoding": 'ACCEPT_ENCODING_HEADER',
                    Referer: `https://aniwatch.to/watch/${id}`,
                },
            }
        );
        const streamArray: { link: string, number: number }[] = []
        const dom = new JSDOM(episodesAjax.data.html)
        const document = dom.window.document;
        document.querySelectorAll(".ss-list > .ssl-item.ep-item").forEach((e, i: number) => streamArray.push({ link: `${e.getAttribute("data-id")!}`, number: i + 1 }));
        return { data: streamArray, success: true }
    } catch (error: any) {
        return error.message;
    }
}
export const streamingLinks = async (id: string, category: "sub" | "dub") => {
    try {
        const response = await fetch(`https://api-aniwatch.onrender.com/anime/episode-srcs?id=${id}&category=${category}&server=vidstreaming`);
        const data = await response.json()
        console.log(data);
        if (!data) return { message: "Data did not fetched.", success: false }
        return { data, success: true }
    } catch (error: any) {
        return error.message
    }
}
