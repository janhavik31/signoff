import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const extractTicketId = (url) => {
  const regex = /\/browse\/([A-Z]+-\d+)/;
  const match = url.match(regex);
  return match ? match[1] : url;
};

const SignOffCard = ({ signOffs, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Unknown":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleIssueClick = (e, issueId) => {
    e.stopPropagation();
    if (issueId?.startsWith('http')) {
      window.open(issueId, '_blank');
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(signOffs.id);
    setShowDeleteModal(false);
  };

  const signoffsData = signOffs.signoffs || signOffs;

  const renderSignoffRow = (label, value, signedBy) => (
    <div className="flex justify-between items-center py-1.5">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm">
        {value || "N/A"}
        {signedBy && ` (by ${signedBy})`}
      </span>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div 
              className="text-blue-600 cursor-pointer text-sm"
              onClick={(e) => handleIssueClick(e, signOffs.issueId)}
            >
              {extractTicketId(signOffs.issueId)}
            </div>
            <span className={`px-2.5 py-1 text-xs rounded-full ${getStatusColor(signOffs.status)}`}>
              {signOffs.status || "Unknown"}
            </span>
          </div>

          <h3 className="text-base font-medium mb-3">
            {signOffs.summary || "New feature on Ed"}
          </h3>

          <div className="space-y-0.5 border-t border-gray-100 pt-2">
            {renderSignoffRow("QA Signoff", signoffsData.qa?.value, signoffsData.qa?.signedBy)}
            {renderSignoffRow("Dev Signoff", signoffsData.dev?.value, signoffsData.dev?.signedBy)}
            {renderSignoffRow("Architect Signoff", signoffsData.architect?.value, signoffsData.architect?.signedBy)}
            {renderSignoffRow("Performance Signoff", signoffsData.performance?.value, signoffsData.performance?.signedBy)}
            {renderSignoffRow("Security Signoff", signoffsData.security?.value, signoffsData.security?.signedBy)}
            {renderSignoffRow("Product Signoff", signoffsData.product?.value, signoffsData.product?.signedBy)}
          </div>

          <div className="border-t border-gray-100 mt-2 pt-2 space-y-1">
            {renderSignoffRow("Signoff Date", signOffs.signoffDate)}
            {renderSignoffRow("Deployment Date", signOffs.deploymentDate)}
          </div>

          <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
            <div className="flex gap-3">
              <button
                onClick={() => onEdit(signOffs)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit</span>
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex items-center gap-1 px-2.5 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
            <button 
              onClick={() => window.open(`/signoff/${signOffs.id}`, '_blank')}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md border border-gray-200"
            >
              <span>Show More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ 
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          <div className="absolute inset-0 bg-gray-500/20 transition-opacity"></div>
          <div 
            className="bg-white/90 backdrop-blur-sm rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl relative transform transition-all duration-300 ease-in-out"
            style={{ 
              animation: 'modal-pop 0.3s ease-out forwards'
            }}
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Delete Confirmation
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this sign-off? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modal-pop {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default SignOffCard;
