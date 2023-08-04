import { useSelector } from "react-redux";

const Bracket = ({ tournament }) => {
  const { name, semifinals, finals, winner, admin_user_name, admin_user_id, started, participants } = tournament;
  const { user } = useSelector((state) => state.auth);

  const handleAdvanceTeam = (team, stage) => {
    // make sure the user is the admin
    if (admin_user_id !== user.id) {
      return;
    }

    // TODO : advance the team to the next stage

  };

  const handleJoinTeam = (team) => {
    // TODO: implement logic to join the selected team
  };

  const handleLeaveTeam = (team) => {
    // TODO: implement logic to leave the selected team
  };

  const isUserInTeam = (team) => {
    // TODO: implement logic to check if the user is in the given team
    return false; // Example return value
  };



  const renderTeam = (team) => (
    <div className="team" onClick={() => handleAdvanceTeam(team, "semifinals")}>
      <div className="team-name">{team.name}</div>
      <ul className="team-members">
        {team && team.teamMembers.map((member, index) => (
          <li key={index}>{member.userName}</li>
        ))}
      </ul>
      {!started && (
        isUserInTeam(team) ?
          <button onClick={() => handleLeaveTeam(team)}>Leave Team</button>
        :
          <button onClick={() => handleJoinTeam(team)}>Join Team</button>
      )}
    </div>
  );

  return (
    <>
    <h3>{name}</h3>
    <h4>Admin: {admin_user_name}</h4>
    <div className="tournament-bracket">
     
      <div className="round semifinals">
        <h4>Semifinals</h4>
        {semifinals.map(renderTeam)}
      </div>
      <div className="round finals">
        <h4>Finals</h4>
        {finals.map(renderTeam)}
      </div>
      <div className="round winner">
        <h4>Winner</h4>
        {winner && renderTeam(winner)}
      </div>
    </div>
    </>
  );
};

export default Bracket;
