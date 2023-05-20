import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
	variants: {
		tab: {
			border: '1px solid',
			borderColor: 'gray.600',
			bg: 'gray.800',
			color: 'gray.200',
			marginRight: '10px',
			_hover: {
				bg: 'gray.600',
				color: 'gray.100',
			},
			_active: {
				bg: 'gray.700',
				color: 'gray.100',
			},
			_focus: {
				boxShadow: 'none',
			},
		},
	},
};
