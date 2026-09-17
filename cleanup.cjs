const fs = require("fs");
const file = "e:\\demo-test\\todayfix-loader\\src\\features\\admin\\AdminBusinessesTab.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(/      \{\/\* Add Business Modal \*\/\}[\s\S]*?<\/form>\n        <\/AdminModal>\n      \)\}\n    <\/div>/m, "    </div>");

fs.writeFileSync(file, content);
console.log("Cleanup complete");
