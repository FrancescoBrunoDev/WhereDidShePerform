export function linkMaker(title) {
  const itemMatch = title.match(
    /(\d{1,2})\.(\d{1,2})\.(\d{4})(?:, (\d{1,2}):(\d{2}))?$/
  );
  if (itemMatch) {
    const itemString = `${itemMatch[3]}-${itemMatch[2].padStart(
      2,
      "0"
    )}-${itemMatch[1].padStart(2, "0")}`;
    const hasTime = itemMatch[4] && itemMatch[5];

    let titleWithoutItem = title.replace(
      /,\s*\d{1,2}\.\d{1,2}\.\d{4}(?:, \d{1,2}:\d{2})?$/,
      ""
    );
    let titleLink = `${titleWithoutItem.replace(/\s+/g, "-")}`;
    if (itemString) {
      titleLink += `-${itemString}`;
    }
    if (hasTime) {
      const timeString = `${itemMatch[4].padStart(2, "0")}-${itemMatch[5]}`;
      titleLink += `-${timeString}`;
    }

    const cleanedTitleLink = titleLink
      .toLowerCase()
      .replace(/[,()\[\].\/]/g, "")
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/-{2,}/g, "-")
      .replace(/,$/, "")
      .replace(/--/g, "-");

    return cleanedTitleLink;
  }

  const personMatch = title.match(/(.+?),\s*(.+)/);
  if (personMatch) {
    const lastName = personMatch[1]
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/\s+/g, "-");
    const firstName = personMatch[2]
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/\s+/g, "-");
    const cleanedTitleLink = `${lastName}-${firstName}`;

    return cleanedTitleLink;
  }

  const cleanedTitleLink = title
    .toLowerCase()
    .replace(/[,()\[\].\/]/g, "")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/-{2,}/g, "-")
    .replace(/,/g, "")
    .replace(/\s+/g, "-");

  return cleanedTitleLink;
}
