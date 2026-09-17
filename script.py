import sys

file_path = r'e:\demo-test\todayfix-loader\src\features\admin\AdminBusinessesTab.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

import_statement = `
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";
import { useEffect } from "react";
`
content = content.replace('import { Plus, FileText } from "lucide-react";', 'import { Plus, FileText } from "lucide-react";\n' + import_statement.strip())

use_query_code = `
  const { data: apiData, isLoading } = useQuery({
    queryKey: ["adminBusinessApplications"],
    queryFn: adminApi.getBusinessApplications,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const rawBusinesses = Array.isArray(apiData?.results) ? apiData.results : Array.isArray(apiData?.data) ? apiData.data : Array.isArray(apiData) ? apiData : [];
    if (rawBusinesses.length > 0) {
      setData(
        rawBusinesses.map((apiBiz) => ({
          id: apiBiz.business_profile_uuid?.split("-")[0].toUpperCase() || apiBiz.id || "N/A",
          business: apiBiz.name || apiBiz.business_name || "N/A",
          owner: apiBiz.user?.first_name ? `${apiBiz.user.first_name} ${apiBiz.user.last_name || ""}` : "N/A",
          category: apiBiz.business_type || "N/A",
          services: apiBiz.services?.length ? `${apiBiz.services.length} Services` : "N/A",
          location: apiBiz.addresses?.[0]?.city || apiBiz.addresses?.[0]?.locality || "N/A",
          rating: apiBiz.rating || "5.0",
          verification: apiBiz.verification_status || (apiBiz.is_verified ? "Verified" : "Pending"),
          status: apiBiz.status || (apiBiz.is_active ? "Active" : "Review"),
          joined: apiBiz.created_at ? new Date(apiBiz.created_at).toISOString().split("T")[0] : "N/A",
          raw: apiBiz,
        }))
      );
    }
  }, [apiData]);
`

content = content.replace('const [data, setData] = useState(MOCK_DATA);', use_query_code.strip())

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated successfully.")
