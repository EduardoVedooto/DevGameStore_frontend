import styled from 'styled-components';
import Loader from "react-loader-spinner";

export default function Loading(){
    return(
        <LoaderHolder>
              <Loader
                type="MutatingDots"
                color="#DA0037"
                secondaryColor="#171717"
                height={100}
                width={100}
              />
        </LoaderHolder>
    )
        
}


const LoaderHolder = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  line-height: 3rem;
  margin-top: 10rem;
  min-height: calc(100vh - 34.8rem);
`;