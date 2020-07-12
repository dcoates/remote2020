fillTemplate = function (templateString, templateVars) {
    var parsed = templateString;
    Object.keys(templateVars).forEach(
        (key) => {
            const value = templateVars[key]
            parsed = parsed.replace('${'+key+'}',value)
        }
    )
    return parsed
}

