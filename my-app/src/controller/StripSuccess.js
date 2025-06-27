import React, {useEffect, useState} from 'react';

function Success({ location }) {
  const [session, setSession] = useState(null);
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');

  useEffect(() => {
    fetch(`http://localhost:4242/checkout-session?sessionId=${sessionId}`)  //TODO
      .then(res => res.json())
      .then(data => setSession(data));
  }, [sessionId]);

  if (!session) return <p>Loading...</p>;
  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      <p>Status: {session.payment_status}</p>
    </div>
  );
}
export default Success;