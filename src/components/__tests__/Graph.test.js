import { render, screen, cleanup } from '@testing-library/react';
import Graph from '../Graph/Graph';

// Clean up after each test
afterEach(cleanup);

test('should render graph component', () => {
	render(<Graph />);
	const graphElement = screen.getByTestId('graph-1');
	expect(graphElement).toBeInTheDocument();
});