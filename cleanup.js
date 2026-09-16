const fs = require("fs");
const file = "e:\\demo-test\\todayfix-loader\\src\\features\\admin\\AdminBusinessesTab.jsx";
let content = fs.readFileSync(file, "utf8");

// 1. Uncomment location
content = content.replace("// location: locationText,", "location: locationText,");

// 2. Remove states
content = content.replace(/  const \[isAddModalOpen[\s\S]*?status: "Review",\n  }\);\n/m, "");

// 3. Remove handleAddBusiness
content = content.replace(/  const handleAddBusiness = \([\s\S]*?toast\.success\(`Business "\$\{createdBusiness\.business\}" added successfully!`\);\n  };\n/m, "");

// 4. Remove handleSendMessage
content = content.replace(/  const handleSendMessage = \([\s\S]*?setMessageText\(""\);\n  };\n/m, "");

// 5. Remove Add Business button
content = content.replace(/        <button\s*onClick=\{\(\) => setIsAddModalOpen\(true\)\}[\s\S]*?<\/button>\n/m, "");

// 6. Remove footer from main AdminModal
content = content.replace(/          title="Business Details"\n          footer=\{[\s\S]*?            <\/select>\n          \}\n        >/m, '          title="Business Details"\n        >');

// 7. Remove bottom 3 modals
content = content.replace(/      \{\/\* Add Business Modal \*\/\}[\s\S]*?<\/AdminModal>\n      \)\}\n    <\/div>/m, "    </div>");

fs.writeFileSync(file, content);
console.log("Cleanup complete");
