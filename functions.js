
function createSyndicateDataTable(selector, dataset) {
    const rows = [];
    for (const data of dataset) {
        const copy = structuredClone(data);
        copy.unitPrice = (copy.plat / copy.count).toFixed(1);
        copy.platPer1kStanding = ((copy.unitPrice / copy.standing) * 1000).toFixed(3)
        rows.push(copy);
    }

    $(selector).DataTable({
        data: rows,
        columns: [
            { data: 'name', title: 'Name' },
            { data: 'standing', title: 'Standing' },
            { data: 'plat', title: 'Max Price' },
            { data: 'unitPrice', title: 'Unit Price' },
            { data: 'platPer1kStanding', title: 'Plat Per 1k Standing' }
        ],
        searching: false,
        info: false,
        paging: false
    });
}
