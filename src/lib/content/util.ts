export const filterByPublished = <T extends { published: boolean }>(data: T) =>
    data.published;

export const filterByUnpublished = <T extends { published: boolean }>(
    data: T
) => !data.published;
