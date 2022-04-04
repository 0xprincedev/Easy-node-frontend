import styled from 'styled-components';
import Column from '../layouts/Column/Column';
import RefreshButton from '../components/RefreshButton/RefreshButton';
import RoundCard from '../layouts/RoundCard/RoundCard';
import Row from '../layouts/Row/Row';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ClaimCard from '../components/ClaimCard/ClaimCard';
import CardText from '../components/CardText/CardText';
import { useEthers } from '@usedapp/core';
import { useCashoutAll, useCreateNodeWithTokens, useGetNodeNumberOf, useGetNodesRewards, useGetRewardAmount, useGetTotalCreatedNodes } from '../hooks';
import { useState } from 'react';
import { ethers } from 'ethers';
import RoundButton from '../components/RoundButton/RoundButton';
import CustomInput from '../components/CustomInput/CustomInput';
import NodeListTable from '../components/NodeListTable/NodeListTable';
import { toast } from 'react-toastify';
import { NETWORK_ID } from '../configs/config';

const AppPage = () => {
    const [newNodeName, setNewNodeName] = useState<string>('');

    const {account, chainId} = useEthers();
    const myNodeCount = useGetNodeNumberOf(account);
    const myRewardAmount = useGetRewardAmount();
    const totalNodeCount = useGetTotalCreatedNodes();
    const {state, send: createNodeWithToken} = useCreateNodeWithTokens();
    const { state: cashoutAllState, send: cashoutAll } = useCashoutAll();

    const [processing, setProcessing] = useState(false);
    const createNode = () => {
        console.log('nodeName: ',newNodeName)
        createNodeWithToken(newNodeName);
    }

    const claimToken = async () => {
        if (!account) {
          toast.warning('Please Connect Wallet!');
          return;
        }
        if (NETWORK_ID !== chainId) {
          toast.warning('Please Select Correct Network!');
          return;
        }
    
        try {
          setProcessing(true);
          cashoutAll();
          
        } catch (e: any) {
          toast.warning(e.message);
          setProcessing(false);
        }
    };
    return (
        <Wrapper>
            <Row horizontalAlign="space-between">
                <SectinoHeader>
                    <SectionTitle text={'EasyNode'} size={'2rem'}/>
                </SectinoHeader>
                <RoundButton width="200px" onClick={() => claimToken()}>Claim $EASY</RoundButton>
            </Row>
           
            <Row>
                <Column width={'0'} minWidth={'250px'} maxWidth={'500px'}>
                    <RoundCard padding="30px">
                        <FlexColumn>
                            <CustomInput type="text" placeHolder={'Input node name'} value={newNodeName} onChange={(e) => setNewNodeName(e.target.value)} />
                            <RoundButton onClick={() => createNode()}>Create New Node</RoundButton>
                        </FlexColumn>
                    </RoundCard>
                </Column>
                <Column width={'0'} minWidth={'250px'} maxWidth={'500px'}>
                    <RoundCard padding="30px">
                        <FlexColumn>
                            <CardText text="My Nodes" />
                            <CardText text={myNodeCount?.toNumber()} color={'red'}/>
                        </FlexColumn>
                    </RoundCard>
                </Column>
                <Column width={'0'} minWidth={'250px'} maxWidth={'500px'}>
                    <RoundCard padding="30px">
                        <FlexColumn>
                            <CardText text="My rewards" />
                            <CardText text={ `${ethers.utils.formatEther(myRewardAmount)} $EASY/DAY`} color={'red'}/>
                        </FlexColumn>
                    </RoundCard>
                </Column>
                <Column width={'0'} minWidth={'250px'} maxWidth={'500px'}>
                    <RoundCard padding="30px"> 
                        <FlexColumn>
                            <CardText text="All Nodes" />
                            <CardText text={totalNodeCount?.toNumber()} color={'red'}/>
                        </FlexColumn>
                    </RoundCard>
                </Column>
            </Row>

            <SectinoHeader>
                <SectionTitle text={'My Nodes'} size={'2rem'}/>
            </SectinoHeader>

            <Row>
                <RoundCard padding="30px">
                    <NodeListTable />
                </RoundCard>
            </Row>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`;

const SectinoHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export default AppPage;