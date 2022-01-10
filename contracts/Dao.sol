// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Dao{
    struct Proposal{
        uint uid;
        uint numberOfVotes;
    }
   enum CurrentState {receivingProposal,receivingVotes,resultReady}
   CurrentState public currentState;
    Proposal [] ListOfProposals;  
    address [] Members;
    // address contractDeployer;
    mapping(uint=>bool) doesProposalExist;
    mapping(address=>bool) hasVoted;
    mapping(address=>bool) isMember;
    uint public winningProposal;
    uint public totalNumberOfProposals;
    uint public totalNumberOfMembers;
    uint public totalNumberOfVotes;

    //these dummy contents help us to resetMappings;
    mapping(uint=>bool) dummyDoesProposalExist;
    mapping(address=>bool) dummyHasVoted;
    mapping(address=>bool) dummyIsMember;

constructor(){
      currentState = CurrentState.receivingProposal;
      totalNumberOfProposals = 0;
      totalNumberOfMembers = 1;
      totalNumberOfVotes = 0;
      isMember[msg.sender] = true;
      Members.push(msg.sender);
    //   contractDeployer = msg.sender;
}    

//events
event proposalSubmitted(uint _proposal);
event voted(uint _proposal, address _address);
event votingStarted(bool started);
event votingEnded(bool ended);
event daoRefreshed(bool refreshed);
event joined(bool joined);

//modifiers
 modifier inState(CurrentState _state){
     require(currentState == _state, "the current Dao state does not permit this");
     _;
 }


//functions
 function submitProposal (uint _proposal) public inState(CurrentState.receivingProposal){
     require(isMember[msg.sender]== true, "Please Register with the Dao before submitting a proposal");
     require(doesProposalExist[_proposal]==false, "proposal already exists");
     Proposal memory proposal = Proposal({uid:_proposal, numberOfVotes:0});
     doesProposalExist[_proposal] = true;
     ListOfProposals.push(proposal);
     totalNumberOfProposals +=1;
     emit proposalSubmitted(_proposal);
 }

function vote(uint _proposal) public inState(CurrentState.receivingVotes) {
    require(isMember[msg.sender]==true,"You are not a member of the Dao, only Dao members can vote");
    require(hasVoted[msg.sender]==false,"You can only vote once");
    require(doesProposalExist[_proposal]==true,"You can only vote submitted proposals, this proposal was not submitted");
    hasVoted[msg.sender] = true;
  
    
    for(uint i =0; i<ListOfProposals.length; i++){
        if(ListOfProposals[i].uid == _proposal){
            ListOfProposals[i].numberOfVotes ++;
        }
         

} 
 totalNumberOfVotes += 1;
emit voted(_proposal,msg.sender);

}

 function result() internal view returns(uint winningPropos){
     uint highestNumberOfVote = 0;
     uint proposalId = 0;
     for(uint i=0; i<ListOfProposals.length; i++){
         if(ListOfProposals[i].numberOfVotes>highestNumberOfVote){
              highestNumberOfVote = ListOfProposals[i].numberOfVotes;
              proposalId = ListOfProposals[i].uid;
             
         }
     }
      return proposalId;
 }

 function allowVoting() public {
     require(ListOfProposals.length>1,"no proposal to vote for or only one proposal exists");
     currentState = CurrentState.receivingVotes;
     emit votingStarted(true);
 }

  function endVoting() public {
      require(totalNumberOfVotes>0,"no votes yet");
     currentState = CurrentState.resultReady;
     emit votingEnded(true);
 }

 function getResults() public {
require(currentState == CurrentState.resultReady,"end voting to get results");
winningProposal = result();
 }

function joinDao( ) public inState(CurrentState.receivingProposal){
    require(isMember[msg.sender]==false,"you are already registered as a member");
    isMember[msg.sender] = true;
    Members.push(msg.sender);
    totalNumberOfMembers += 1;
    emit joined(true);
}

function refresh() public {
    require(totalNumberOfMembers>2,"Dao is fresh already");
    currentState = CurrentState.receivingProposal;
    winningProposal = 0;
    totalNumberOfProposals = 0;
    totalNumberOfMembers = 0;
     totalNumberOfVotes = 0;
    for(uint i = 1; i<Members.length; i++){
        isMember[Members[i]] = false;
        hasVoted[Members[i]] = false;
}



   if(ListOfProposals.length>0){

  
   for(uint i = 0; i<ListOfProposals.length; i++){
       doesProposalExist[ListOfProposals[i].uid] = false;
}
 }
delete Members;
delete ListOfProposals;

emit daoRefreshed(true);
}

}