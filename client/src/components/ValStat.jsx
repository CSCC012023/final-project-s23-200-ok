import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const API_URL = "/api/profile/";
export default function ValStat () {

    const {
      games,
    } = useSelector((state) => state.profile);
  
    const [valStat, setValStat] = useState();
    const [seasons, setSeasons] = useState();
    // const dispatch = useDispatch();
    console.log(games);

    function convertArray(valStat){
      var map = new Map();

      for (var key in valStat){
        // console.log(valStat[key]);
        if (!valStat[key].hasOwnProperty("error")){
          map.set(key, valStat[key])
        }
      }

      let mapArray = Array.from(map.entries());
      mapArray = mapArray.reverse();
      // console.log(mapArray);
      return mapArray;
    }

    useEffect(()=> {
      
      const parts = games[0].ign.split("#");
      
      const param = {
        username: parts[0],
        tagline: parts[1],
        region: games[0].region
      }

      const user_data = async () => {
        const response = await axios.get(
          API_URL + "games/valorant/" + 
          param.region + "/" + 
          param.username + "/" +
          param.tagline + "/stat"
        );
        console.log(response.data);
        setValStat(response.data);
        setSeasons(convertArray(response.data.by_season));
      }
      
      user_data();
    },[]);

    return (
        <div className="stat-container">

            {valStat && 
              

              <div>
        {/* <button onClick={()=>{console.log(convertArray(valStat.by_season))}}>
            test
        </button> */}
              {valStat.name && 
                <div className="val-stat-username">
     
                    <p>{valStat.name + " "}#{" " + valStat.tag} </p>

                    <p>Region: {games[0].region.toUpperCase()}</p>
   

                </div>}
              {valStat.highest_rank && 
                <div className="highest-val-rank-container">
                  <p>Career highest rank: {" " + valStat.highest_rank.patched_tier}</p>
                  <p>Season: {" " + valStat.highest_rank.season}</p>
                </div>
              }

              {valStat.current_data && 
                <div className="val-stat-current-data-container">
                  <p>Career rank: {valStat.current_data.currenttierpatched}</p>
                  <p>Elo: {" " + valStat.current_data.elo}</p>
                  <div className="val-stat-ctier-mmr-c">
                    <p>{"Ranking in tier: " + valStat.current_data.ranking_in_tier}
                    </p>
                    <p>{"MMR change: " + valStat.current_data.mmr_change_to_last_game}
                    </p>
                    
                  </div>
                </div>
              }

              {valStat.by_season && 
                <div className="val-stat-seasons">

                  {seasons && seasons.map(([key,val],index) => {
                    return <div className="val-stat-season" key={index}>
                      
                      <div>
                        <p>season:{key}</p>
                        <p>wins: {val.wins}</p>
                      </div>
                      <div>
                        <p>games played: {val.number_of_games}</p>
                        <p>final rank: {val.final_rank_patched + "/" + val.final_rank}</p>
                      </div>

                    </div>
                  })}
                
                </div>
              }
              
              
              
              
              </div>

            }

            { !valStat && <div>loading</div> }
          
        </div>
    )
}