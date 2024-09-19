import { InputNumber, Space, Typography } from 'antd';
import { useReducer } from 'react';
import { debounce } from 'radash'
function transformNumber(value: number, flag: boolean) {
  return flag ? value * 2 : value / 2;
}

type State = {
  v1: string | null;
  v2: string | null;
};

type Action =
  | { type: 'SET_V1'; payload: string | null }
  | { type: 'SET_V2'; payload: string | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_V1': {
      if (action.payload === null) {
        return { ...state, v1: null, v2: null };
      }
      const numberV1 = parseFloat(action.payload);
      if (!isNaN(numberV1)) {
        return {
          v1: action.payload,
          v2: transformNumber(numberV1, false).toString(),
        };
      }
      return { ...state, v1: action.payload };
    }
    case 'SET_V2': {
      if (action.payload === null) {
        return { ...state, v1: null, v2: null };
      }
      const numberV2 = parseFloat(action.payload);
      if (!isNaN(numberV2)) {
        return {
          v1: transformNumber(numberV2, true).toString(),
          v2: action.payload,
        };
      }
      return { ...state, v2: action.payload };
    }
    default:
      return state;
  }
}

const TestInput = () => {
  const [state, dispatch] = useReducer(reducer, { v1: null, v2: null });

  const handleV1Change = (value: string | null) => {
    dispatch({ type: 'SET_V1', payload: value });
  };

  const handleV2Change = (value: string | null) => {
    debounce({ delay: 100 }, () => {
      dispatch({ type: 'SET_V2', payload: value });
    })
  };

  return (
    <div className="flex flex-col gap-2">
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Typography.Text strong>输入值 1:</Typography.Text>
          <InputNumber
            className="w-full mt-2"
            stringMode
            value={state.v1}
            onChange={debounce({ delay: 500 }, handleV1Change)}
            placeholder="请输入数字"
            size="large"
            style={{ borderRadius: '8px' }}
          />
        </div>
        <div>
          <Typography.Text strong>输入值 2:</Typography.Text>
          <InputNumber
            className="w-full mt-2"
            stringMode
            value={state.v2}
            onChange={handleV2Change}
            placeholder="请输入数字"
            size="large"
            style={{ borderRadius: '8px' }}
          />
        </div>
      </Space>
    </div>
  );
};

export default TestInput;
