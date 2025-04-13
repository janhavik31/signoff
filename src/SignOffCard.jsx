import React from "react";
import { useNavigate } from "react-router-dom";

const SignOffCard = ({ signOffs, onEdit, onDelete }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleIssueClick = (e, issueId) => {
    e.stopPropagation();
    navigate(`/issue/${issueId}`); 
  };

  const signoffsData = signOffs.signoffs || signOffs;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5 space-y-2">
        <div className="flex justify-between items-start">
          <div className="text-sm text-blue-600 underline">
            <a
              href={signOffs.issueLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleIssueClick(e, signOffs.issueId)}
            >
              {signOffs.issueId || "No Issue ID"}
            </a>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(signOffs.status)}`}>
            {signOffs.status || "Unknown"}
          </span>
        </div>

        <h3 className="text-lg font-bold">
          {signOffs.summary || "No Summary"}
        </h3>

        <div className="grid grid-cols-2 gap-x-4 text-sm">
          {[
            { label: "QA Signoff", value: signoffsData.qa?.value, signedBy: signoffsData.qa?.signedBy },
            { label: "Dev Signoff", value: signoffsData.dev?.value, signedBy: signoffsData.dev?.signedBy },
            { label: "Architect Signoff", value: signoffsData.architect?.value, signedBy: signoffsData.architect?.signedBy },
            { label: "Performance Signoff", value: signoffsData.performance?.value, signedBy: signoffsData.performance?.signedBy },
            { label: "Security Signoff", value: signoffsData.security?.value, signedBy: signoffsData.security?.signedBy },
            { label: "Product Signoff", value: signoffsData.product?.value, signedBy: signoffsData.product?.signedBy },
          ].map(({ label, value, signedBy }) => (
            <div key={label} className="flex justify-between">
              <span className="font-medium text-gray-500">{label}</span>
              <span>
                {value || "N/A"}
                {signedBy && ` (by ${signedBy})`}
              </span>
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-600">
          Signoff Date: {signOffs.signoffDate || "N/A"}
        </div>
        <div className="text-sm text-gray-600">
          Deployment Date: {signOffs.deploymentDate || "N/A"}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => onEdit(signOffs)}
            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(signOffs.id)}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOffCard;
