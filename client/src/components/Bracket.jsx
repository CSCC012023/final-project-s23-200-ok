import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateTournamentById } from "../features/tournaments/tournamentsSlice";

const Bracket = ({
  tournament,
  handleAddParticipantToTeam,
  handleLeaveTournament,
}) => {
  const {
    name,
    semifinals,
    finals,
    winner,
    admin_user_name,
    admin_user_id,
    started,
    ended,
  } = tournament;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAdvanceTeam = (team) => {
    // make sure the user is the admin
    if (admin_user_id !== user._id) {
      return;
    }

    // get the next stage
    const nextStage = getNextStage(team);

    let updatedTournament;

    if (nextStage === "finals") {
      // add the team to the finals
      updatedTournament = {
        ...tournament,
        finals: [...tournament.finals, team],
      };
    }
    else if (nextStage === "winner") {
      // add the team as the winner
      updatedTournament = {
        ...tournament,
        winner: team
      }
    }

    if (nextStage !== "n/a") {
      dispatch(
        updateTournamentById({
          tournamentId: tournament._id,
          updatedTournament,
        })
      );
    }
  };

  const getNextStage = (team) => {
    // Team is already the winner
    if (tournament.winner === team) {
      return "n/a";
    }
    // Next of finals is winner
    else if (tournament.finals.includes(team)) {
      return "winner";
    }
    // Next of semifinals is finals (if there aren't already 2 finalists)
    else if (tournament.semifinals.includes(team) && finals.length < 2) {
      return "finals";
    }
    // Otherwise cannot be advanced (team doesn't exist in the tournament)
    console.log(team);
    return "n/a";
  };

  const handleJoinTeam = (team) => {
    handleAddParticipantToTeam(tournament._id, team._id);
  };

  const handleLeaveTeam = () => {
    // Leaving a team without joining another is equivalent to leaving the tournament
    handleLeaveTournament(tournament._id);
  };

  const startTournament = () => {
    // updated the started field to true
    const updatedTournament = { ...tournament, started: true };
    dispatch(updateTournamentById({ tournamentId: tournament._id, updatedTournament }));
  };

  const isUserInTeam = (team) => {
    for (let i = 0; i < tournament.semifinals.length; i++) {
      if (tournament.semifinals[i].name === team.name) {
        const participantIndex = tournament.semifinals[i].teamMembers.findIndex(
          (participant) => participant.user_id === user._id.toString()
        );
        if (participantIndex !== -1) {
          return true;
        }
        return false;
      }
    }
  };

  const renderTeam = (team) => (
    <div className="team">
      <div className="team-name">{team.name}</div>
      <ul className="team-members">
        {team &&
          team.teamMembers.map((member, index) => (
            <li key={index}>{member.userName}</li>
          ))}
      </ul>
      {!started && (
        <>
          {isUserInTeam(team) ? (
            <button onClick={() => handleLeaveTeam(team)}>Leave Team</button>
          ) : (
            <>
              {team.teamMembers.length < 5 && (
                <button onClick={() => handleJoinTeam(team)}>Join Team</button>
              )}
            </>
          )}
        </>
      )}
      {started &&
        !ended &&
        user._id === admin_user_id &&
        tournament.winner !== team && (
        <button onClick={() => handleAdvanceTeam(team)}>Advance Team</button>
      )}
    </div>
  );

  return (
    <>
      <h3>{name}</h3>
      <h4>Admin: {admin_user_name}</h4>
      {!started && admin_user_id === user._id && (
        <button className="btn" onClick={() => startTournament()}>
          Start Tournament
        </button>
      )}
      <div className="tournament-bracket">
        <div className="round semifinals">
          <h4>Semifinals</h4>
          <div className="bracket-container">
            <div className="rectangle">
              {semifinals.slice(0, 2).map((team, index) => (
                <>
                  <div key={index} className="bracket-slot">
                    {renderTeam(team)}
                  </div>
                  {index === 0 && <h1>Vs</h1>}
                </>
              ))}
            </div>
            <br />
            <div className="rectangle">
              {semifinals.slice(2, 4).map((team, index) => (
                <>
                  <div key={index} className="bracket-slot">
                    {renderTeam(team)}
                  </div>
                  {index === 0 && <h1>Vs</h1>}
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="round finals">
          <h4>Finals</h4>
          <div className="bracket-container finals-bracket">
            <div className="rectangle">
              <div className="bracket-slot">
                {finals.length >= 1 ? (
                  renderTeam(finals[0])
                ) : (
                  <h3>TBD</h3>
                )}
              </div>
            </div>
            <h1>Vs</h1>
            <div className="rectangle">
              <div className="bracket-slot">
                {finals.length === 2 ? (
                  renderTeam(finals[1])
                ) : (
                  <h3>TBD</h3>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="round winner">
          <h4>Winner</h4>
          {winner && renderTeam(winner, "winner")}
        </div>
      </div>
    </>
  );
};

export default Bracket;
