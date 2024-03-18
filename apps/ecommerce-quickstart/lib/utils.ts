import { ReadonlyURLSearchParams } from "next/navigation"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const createUrl = (
    pathname: string,
    params: URLSearchParams | ReadonlyURLSearchParams
) => {
    const paramsString = params.toString()
    const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

    return `${pathname}${queryString}`
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function updateUrlWithColor(
    currentSearchParams: string,
    newColor: string,
    addColor: boolean // Indicates whether to add or remove the color
): URLSearchParams {
    const params = new URLSearchParams(currentSearchParams)
    const filterQueryParamKey = "filterQuery"
    const colorParamKey = "perceived_colour_master_name"

    // Function to update, add, or remove the color in the filterQuery
    const updateFilterQuery = (filterQuery: string | null): string => {
        // Attempt to find an existing color filter structure
        let existingFilterMatch = filterQuery?.match(
            new RegExp(
                `\\(${colorParamKey}:"[^"]+"( OR ${colorParamKey}:"[^"]+")*\\)`
            )
        )
        let colorFilters = existingFilterMatch ? existingFilterMatch[0] : null

        // Parse existing colors or initialize an empty array
        let colors = colorFilters
            ? colorFilters
                  .match(new RegExp(`${colorParamKey}:"([^"]+)"`, "g"))
                  ?.map((color) => color.slice(colorParamKey.length + 2, -1))
            : []

        if (addColor) {
            // Add color if not already present
            if (!colors?.includes(newColor)) {
                colors = [...(colors || []), newColor]
            }
        } else {
            // Remove color if present
            colors = colors?.filter((color) => color !== newColor)
        }

        // Construct the new filter query
        let newFilterQuery = filterQuery || ""
        if (colorFilters) {
            // Replace or remove the existing color filter
            newFilterQuery = newFilterQuery.replace(
                // @ts-ignore
                existingFilterMatch[0],
                // @ts-ignore
                colors.length > 0
                    ? // @ts-ignore
                      `(${colorParamKey}:"${colors.join(
                          `" OR ${colorParamKey}:"`
                      )}")`
                    : ""
            )
        } else if (addColor) {
            // Append new color filter
            newFilterQuery += newFilterQuery.length > 0 ? " AND " : ""
            newFilterQuery += `(${colorParamKey}:"${newColor}")`
        }

        // Clean up: remove leading/trailing AND if they exist
        newFilterQuery = newFilterQuery.replace(/^ AND | AND $/g, "")

        return newFilterQuery
    }

    if (params.has(filterQueryParamKey)) {
        // Update the existing filterQuery
        const filterQuery = params.get(filterQueryParamKey)
        const updatedFilterQuery = updateFilterQuery(filterQuery)
        if (updatedFilterQuery.length > 0) {
            params.set(filterQueryParamKey, updatedFilterQuery)
        } else {
            // If the updated filterQuery is empty, remove the filterQueryParamKey entirely
            params.delete(filterQueryParamKey)
        }
    } else if (addColor) {
        // Create a new filterQuery with the color
        const newFilterQuery = `(${colorParamKey}:"${newColor}")`
        params.set(filterQueryParamKey, newFilterQuery)
    }

    return params
}
