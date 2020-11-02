/* link-to-org.js --- Main file for the extension.
 *
 * Copyright (C) 2020 Miquel Sabaté Solà <mikisabate@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var browser = browser || chrome;

browser.contextMenus.create({
    id: "link-to-org",
    title: browser.i18n.getMessage("contextMenuItemLinkToOrg"),
    contexts: ["link"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "link-to-org") {
        // Generate the string which is the equivalent for the org-mode format.
        var text = "[[" + info.linkUrl + "]["+ info.linkText +"]]";
        console.log(info);
        console.log(window.getSelection().toString());

        // And now just copy the string into the clipboard. It will show a
        // notification on error.
        navigator.clipboard.writeText(text).then(() => {}, (error) => {
            console.log(error);
            browser.notifications.create({
                "type": "basic",
                "iconUrl": browser.extension.getURL("icons/48.png"),
                "title": browser.i18n.getMessage("extensionName"),
                "message": browser.i18n.getMessage("linkToOrgFailed")
            });
        });
    }
});
