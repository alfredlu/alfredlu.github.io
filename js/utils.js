async function dumpNews(total = 0, div_name = "news-container") {
    // 1. 把 XML 拿下来
    const xmlText = await fetch('news.xml').then(r => {
        if (!r.ok) throw new Error('news.xml 加载失败');
        return r.text();
    });

    // 2. 解析成 DOM
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'application/xml');
    const entries = Array.from(xml.querySelectorAll('entry'));

    // 3. 决定显示多少条
    const max = total > 0 ? Math.min(total, entries.length) : entries.length;
    const showMore = total > 0 && max < entries.length;
    const showBack = false;          // 原 PHP 里始终 false，保留接口

    // 4. 拼 HTML
    let html = '<ul class="redpinli">\n';

    for (let i = 0; i < max; i++) {
        const entry = entries[i];
        const timeStamp = entry.querySelector('time').textContent;
        let   eventText = entry.querySelector('event').textContent;

        // 替换链接
        const links = entry.querySelectorAll('links name');
        links.forEach((nameNode, idx) => {
        const name = nameNode.textContent;
        const to   = entry.querySelectorAll('links to')[idx]?.textContent || '#';
        eventText = eventText.replace(new RegExp(name, 'g'),
                                        `<a href="${to}">${name}</a>`);
        });

        html += `<li><font color="#F000BD">${timeStamp}</font> ${eventText}</li>\n`;
    }

    if (showMore) {
        html += '<li><a href="news.html">more news and posts...</a></li>\n';
    }
    if (showBack) {
        html += '<li><a href="index.html">back...</a></li>\n';
    }

    html += '</ul>';

    // 5. 插到页面里（你可以把 id 换成自己容器）
    const container = document.getElementById(div_name);
    if (container) container.innerHTML = html;
}

function loadTitle(div_name = "title-container") {
    const html_txt = [
        "<table cellpadding=\"10\">",
        "<tr>",
        "    <td align=\"left\">",
        "    <img align=\"top\" src=\"my.gif\" alt=\"Self Portrait\">",
        "    </td>",
        "    <td align=\"center\">",
        "    <br/>",
        "    <table cellpadding=\"10\">",
        "       <tr>",
        "       <td align=\"left\">",
        "           <i>\"Vision without action is a daydream; action without vision is a nightmare\"</i><br/>",
        "           <i>- Japanese Proverb</i>",
        "       </td>",
        "       </tr>",
        "       <tr>",
        "       <td align=\"left\">",
        "           E-mail: AlfredWJLu AT gmail DOT com<br/>",
        "           Wechat: alfredwjlu<br/>",
        "           <br/>",
        "            Curriculum Vitae (<a href=\"doc/LuwjCVEn.pdf\">en</a>)<br/>",
        "            <!-- <a href=\"paps.php\">Projects and Publications</a> -->",
        "       </td>",
        "       </tr>",
        "       <tr>",
        "       <td align=\"left\">",
        "           <a href=\"http://cn.linkedin.com/in/weijialu\" title=\"Be my career partner in LinkedIn\"><img align=\"left\" src=\"Linkedin-icon.png\" alt=\"linkedin\" style=\"margin-right: 10px;\"></a>",
        "           <a href=\"http://www.facebook.com/alfredwjlu\" title=\"Share my joy in Facebook\"><img align=\"left\" src=\"FaceBook-icon.png\" alt=\"facebook\" style=\"margin-right: 10px;\"></a>",
        "           <a href=\"mailto:AlfredWJLu@gmail.com\" title=\"Give me a mail\"><img align=\"left\" src=\"Google-icon.png\" alt=\"gmail\" style=\"margin-right: 10px;\"></a>",
        "           <!-- <a href=\"rss.php\" title=\"Subscribe my updates by a RSS client\"><img align=\"left\" src=\"Rss-icon.png\" alt=\"rss\" style=\"margin-right: 10px;\"></a> -->",
        "       </td>",
        "       </tr>",
        "   </table>",
        "   </td>",
        "</tr>",
        "</table>"
    ].join("\n")
    const container = document.getElementById(div_name);
    if (container) container.innerHTML = html;
}
