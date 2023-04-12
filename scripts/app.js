var main = () => {
    "use strict";
    console.log("hello, world!");
    const info = $("grid-events:nth-child(1)");
    console.log(info);
    console.log()
    const yesterday_schedeule = [
        "Новости",
        "Хоккей",
        "Время",
        "Спокойной ночи малыши"
    ];
    for (let tabNumber = 0; tabNumber < yesterday_schedeule.length; tabNumber++) {
        const tabSelector = ".yesterday-item";
        $(tabSelector).on("click", () => {
            $("h3.grid-item").append(yesterday_schedeule[tabNumber]);
        });
    }
    
};
$(document).ready(main);