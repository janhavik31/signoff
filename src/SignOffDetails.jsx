import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import { ArrowLeft } from 'lucide-react';

const SignOffDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [signOff, setSignOff] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSignOff = async () => {
      try {
        const docRef = doc(firestore, 'signOffs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSignOff({ id: docSnap.id, ...docSnap.data() });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sign-off:', error);
        setLoading(false);
      }
    };

    fetchSignOff();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!signOff) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Sign-off not found</p>
      </div>
    );
  }

  const renderSignoffSection = (label, data) => (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-2 capitalize">{label} Signoff</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Status:</span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            data.value === 'Yes' ? 'bg-green-100 text-green-800' :
            data.value === 'No' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {data.value || 'Not Set'}
          </span>
        </div>
        {data.signedBy && (
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Signed by:</span>
            <span className="text-gray-900">{data.signedBy}</span>
          </div>
        )}
        {data.comment && (
          <div>
            <span className="text-gray-600 block mb-1">Comments:</span>
            <p className="text-gray-900 bg-white p-3 rounded border border-gray-200">
              {data.comment}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sign-off Details</h1>
        </div>


        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600 block">Team Name</span>
                <span className="text-gray-900 font-medium">{signOff.teamName}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Issue ID</span>
                <span className="text-gray-900 font-medium">{signOff.issueId}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Status</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  signOff.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  signOff.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {signOff.status}
                </span>
              </div>
              <div>
                <span className="text-gray-600 block">Sign-off Date</span>
                <span className="text-gray-900 font-medium">{signOff.signoffDate}</span>
              </div>
              <div>
                <span className="text-gray-600 block">Deployment Date</span>
                <span className="text-gray-900 font-medium">{signOff.deploymentDate}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
            <p className="text-gray-900 bg-gray-50 p-4 rounded border border-gray-200">
              {signOff.summary}
            </p>
          </div>

          {/* Sign-offs */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sign-offs</h2>
            <div className="space-y-4">
              {Object.entries(signOff.signoffs || {}).map(([key, data]) => (
                renderSignoffSection(key, data)
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOffDetails; 