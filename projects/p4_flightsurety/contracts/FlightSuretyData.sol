pragma solidity ^0.4.25;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract FlightSuretyData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner;                                      // Account used to deploy contract
    bool private operational = true;                                    // Blocks all state changes throughout the contract if false

    //address[] private airlines;

    uint256 totalRegisteredAirlines;
    struct Airline {
        address airline;
        bool isRegistered;
        bool isFunded;
        address[] voters;
    }
    mapping(address => Airline) registeredAirlines;      


    uint256 public constant AIRLINE_REGISTRATION_FEE = 10 ether;

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/


    /**
    * @dev Constructor
    *      The deploying account becomes contractOwner
    */
    constructor
                                (
                                    address initialAirline
                                ) 
                                public 
    {
        contractOwner = msg.sender;


        registeredAirlines[initialAirline] = Airline({
                                        airline: initialAirline,
                                        isRegistered: true,
                                        isFunded: false,
                                        voters: new address[](0x00)
                                });
        totalRegisteredAirlines = 1;
        //airlines.push(initialAirline);
    }

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
    * @dev Modifier that requires the "operational" boolean variable to be "true"
    *      This is used on all state changing functions to pause the contract in 
    *      the event there is an issue that needs to be fixed
    */
    modifier requireIsOperational() 
    {
        require(operational, "Contract is currently not operational");
        _;  // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
    * @dev Modifier that requires the "ContractOwner" account to be the function caller
    */
    modifier requireContractOwner()
    {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }


    modifier requireFromRegisteredAirlines(address voter)
    {
        require(isAirlineRegistered(voter), "Voter not from registered airline (<4)");
        _;
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    /**
    * @dev Get operating status of contract
    *
    * @return A bool that is the current operating status
    */      
    function isOperational() 
                            public 
                            view 
                            returns(bool) 
    {
        return operational;
    }


    /**
    * @dev Sets contract operations on/off
    *
    * When operational mode is disabled, all write transactions except for this one will fail
    */    
    function setOperatingStatus
                            (
                                bool mode
                            ) 
                            external
                            requireContractOwner 
    {
        operational = mode;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

   /**
    * @dev Add an airline to the registration queue
    *      Can only be called from FlightSuretyApp contract
    *
    */   
    function registerAirline
                            (
                            address airline,
                            address voter
                            )
                            external
                            requireIsOperational
                            requireFromRegisteredAirlines(voter)
                            returns(uint256 votes)

    {

        require(!registeredAirlines[airline].isRegistered, "Airline is already registered.");

        if(totalRegisteredAirlines < 4)
        {
            registeredAirlines[airline] = Airline({
                                            airline: airline,
                                            isRegistered: true,
                                            isFunded: false,
                                            voters: new address[](0x00)
                                    });
            totalRegisteredAirlines ++;
        }
        else
        {
            if (registeredAirlines[airline].airline == address(0x0))
            {
                registeredAirlines[airline] = Airline({
                                                airline: airline,
                                                isRegistered: false,
                                                isFunded: false,
                                                voters: new address[](0x00)
                                        });
            }
            if(!isExistInArray(registeredAirlines[airline].voters, voter))
            {
                registeredAirlines[airline].voters.push(voter);
            }
            uint treshold = totalRegisteredAirlines / 2;
            votes = registeredAirlines[airline].voters.length;
            if(registeredAirlines[airline].voters.length > treshold)
            {
                totalRegisteredAirlines ++;
                registeredAirlines[airline].isRegistered = true;
            }

        }
    }


   /**
    * @dev Buy insurance for a flight
    *
    */   
    function buy
                            (                             
                            )
                            external
                            payable
    {

    }

    /**
     *  @dev Credits payouts to insurees
    */
    function creditInsurees
                                (
                                )
                                external
                                pure
    {
    }
    

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
    */
    function pay
                            (
                            )
                            external
                            pure
    {
    }

   /**
    * @dev Initial funding for the insurance. Unless there are too many delayed flights
    *      resulting in insurance payouts, the contract should be self-sustaining
    *
    */   
    function fund
                            (  
                            address airline 
                            )
                            public
                            payable
                            requireIsOperational
                            requireFromRegisteredAirlines(airline)
    {

        require(msg.value >= AIRLINE_REGISTRATION_FEE, "Not sufficient fund");
        registeredAirlines[airline].isFunded = true;
    }

    function getFlightKey
                        (
                            address airline,
                            string memory flight,
                            uint256 timestamp
                        )
                        pure
                        internal
                        returns(bytes32) 
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    /**
    * @dev Fallback function for funding smart contract.
    *
    */
    function() 
                            external 
                            payable 
    {
        fund(msg.sender);
    }



    /**
    * helpers
    *
    */


    function isAirlineRegistered(address airline) public view returns (bool result) {
        return registeredAirlines[airline].isRegistered;
    }

    function isAirlineFunded(address airline) public view returns (bool result) {
        return registeredAirlines[airline].isFunded;
    }

    function isExistInArray(address[] targetArray, address searchElement) private view returns (bool result) {
        for(uint256 i=0; i< targetArray.length; i++)
        {
            if (targetArray[i] == searchElement)
            {
                return true;
            }
        }
        return false;
    }

    function getTotalRegisteredAirlines() public view returns (uint256 result) {
        result = totalRegisteredAirlines;
    }

    function getVoters(address airline) public view returns (address[] result) {
        result = registeredAirlines[airline].voters;
    }



}

