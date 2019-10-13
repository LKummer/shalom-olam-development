const fuse_options = {
    shouldSort: true,
    includeMatches: true,
    findAllMatches: true,
    threshold: .5,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        'title',
        'series',
        'categories'
    ]
};

var fuse = false;
var fuse_promise = new Promise((resolve, reject) => {
    $.getJSON('/חיפוש/index.json', (result, status) => {
        if (status === 'success') {
            resolve(result);
        }
        else {
            reject();
        };
    });
})
.then(response => {
    fuse = new Fuse(response, fuse_options);
});

function string_insert(string, substring, position) {
    return `${string.slice(0, position)}${substring}${string.slice(position)}`;
}

const highlight_start = '<mark>'
const highlight_end = '</mark>'
function highlight_string(string, matches) {
    let extra_length = 0;
    matches.forEach(indices => {
        string = string_insert(string, highlight_start, indices[0] + extra_length);
        extra_length += highlight_start.length;
        string = string_insert(string, highlight_end, indices[1] + extra_length + 1);
        extra_length += highlight_end.length;
    })
    return string;
}

function highlight_match(result) {
    console.log(result.matches);
    result.matches.forEach(match => {
        if (match.key == 'title') {
            result.item[match.key] = highlight_string(result.item[match.key], match.indices);
        }
        else {
            result.item[match.key][match.arrayIndex] = highlight_string(result.item[match.key][match.arrayIndex], match.indices);
        }
    });
    return result;
}

function reduce_key(array, prefix, suffix, delimeter = ', ') {
    if (array && array.length >= 1) {
        let result = `${prefix}: `;
        array.forEach(e => {
            result += e + delimeter;
        });
        result = result.slice(0, -delimeter.length);
        result += suffix;
        return result;
    }
    else {
        return '';
    }
}

function search(term) {
    return $.extend(true, [], fuse.search(term))
        .map(result => highlight_match(result))
        .reduce((acc, cur) => {
            const obj = {title: cur.item.title, url: cur.item.url};
            obj.description = `${reduce_key(cur.item.series, 'סדרה', '. ')}
                ${reduce_key(cur.item.categories, 'קטגוריות', '.')}<br>
                ${cur.item.date}`;
            acc.push(obj);
            return acc;
        }, []);
}

// Menu Search
$('.ui.search').search({ 
    apiSettings: {
        responseAsync: (settings, callback) => {
            if (fuse)
            {
                const results = search(settings.urlData.query);
                callback({results: results, success: true});
            }
            else {
                return {success: false};
            }
        }},
    error: {
        noResults: 'אולי תנסו משהו אחר?'
    },
    selectFirstResult: true,
    searchDelay: 0
});

// Search Page:
function format_search_as_cards(search) {
    return search.reduce((acc, cur) => {
            return acc +
                `
                <a href=${cur.url} class="card">
                <div class="content">
                    <div class="header">${cur.title}</div>
                    ${cur.description}
                </div>
                </a>`
        }, '');
}

$('#search-input').click(e => {
    const results = format_search_as_cards(search($(e.currentTarget).val()));
    $('#search-results').html(results);
});
$('#search-input').keyup(e => {
    const results = format_search_as_cards(search($(e.currentTarget).val()));
    $('#search-results').html(results);
});