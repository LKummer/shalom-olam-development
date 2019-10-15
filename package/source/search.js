// Search Helpers:
function string_insert(string, substring, position) {
    return `${string.slice(0, position)}${substring}${string.slice(position)}`;
}

const highlight_start = '<mark>';
const highlight_end = '</mark>';
function highlight_string(string, matches) {
    let extra_length = 0;
    matches.forEach(indices => {
        string = string_insert(string, highlight_start, indices[0] + extra_length);
        extra_length += highlight_start.length;
        string = string_insert(string, highlight_end, indices[1] + extra_length + 1);
        extra_length += highlight_end.length;
    });
    return string;
}

function highlight_match(search_results) {
    search_results.matches.forEach(match => {
        if (match.key === 'title') {
            search_results.item[match.key] = highlight_string(search_results.item[match.key], match.indices);
        } else {
            search_results.item[match.key][match.arrayIndex] = highlight_string(search_results.item[match.key][match.arrayIndex], match.indices);
        }
    });
    return search_results;
}

function reduce_key(array, plural_prefix, singular_prefix, suffix, delimeter = ', ') {
    if (array && array.length >= 2) {
        let result = `${plural_prefix}: `;
        array.forEach(e => {
            result += e + delimeter;
        });
        result = result.slice(0, -delimeter.length);
        result += suffix;
        return result;
    } else if (array && array.length === 1) {
        return `${singular_prefix}: ${array[0]}${suffix}`;
    } else {
        return '';
    }
}

function parse_results(search_results) {
    let results = $.extend(true, [], search_results);
    results = results.map(result => highlight_match(result));
    results = results.reduce((acc, cur) => {
        const obj = {title: cur.item.title, url: cur.item.url};
        obj.description = `${reduce_key(cur.item.series, 'סדרות', 'סדרה', '. ')}`
            + `${reduce_key(cur.item.categories, 'קטגוריות', 'קטגוריה', '.')}<br>`
            + `${cur.item.date ? cur.item.date : ''}`;
        acc.push(obj);
        return acc;
    }, []);
    return results;
}

// Search Implementation.
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

function search_json_promise(url) {
    return new Promise((resolve, reject) => {
        $.getJSON(url, (result) => {
            resolve(result);
        }).fail(() => {
            reject();
        });
    });
}

function fuse_cache(cache) {
    if (cache.status === false) {
        return search_json_promise('/חיפוש/index.json')
            .then(result => {
                cache.fuse = new Fuse(result, fuse_options);
                cache.status = true;
                return cache.fuse;
            });
    } else {
        return Promise.resolve(cache.fuse);
    }
}

var fuse_c = {status: false};
function search_promise(term) {
    return fuse_cache(fuse_c)
        .then(fuse => {
            return parse_results(fuse.search(term));
        })
        .catch(() => {
            return [{title: "Server Error", description: "היתה בעיה עם הגישה לשרת."}];
        });
}

// Menu Search
function initialize_search_menu() {
    $('.ui.search').search({
        apiSettings: {
            responseAsync: (settings, callback) => {
                search_promise(settings.urlData.query).then((results) => {
                    callback({results: results, success: true});
                }, () => {
                    callback({success: false});
                });
            }},
        error: {
            noResults: 'אולי תנסו משהו אחר?'
        },
        selectFirstResult: true,
        searchDelay: 0
    });
}

// Search Page:
function format_search_as_cards(search_results) {
    console.log(search_results);
    return search_results.reduce((acc, cur) => {
        return acc +
            `<a href=${cur.url} class="card"><div class="content"><div class="header">${cur.title}</div>${cur.description}</div></a>`;
    }, '');
}

function set_results_to_cards(search_results) {
    $('#search-results').html(format_search_as_cards(search_results));
}

function initialize_search_page() {
    $('#search-input').click(e => {
        search_promise($(e.currentTarget).val()).then(results => {
            set_results_to_cards(results);
        });
    });
    $('#search-input').keyup(e => {
        search_promise($(e.currentTarget).val()).then(results => {
            set_results_to_cards(results);
        });
    });
}

export function initialize_search() {
    initialize_search_menu();
    initialize_search_page();
}