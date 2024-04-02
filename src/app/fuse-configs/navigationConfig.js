import { authRoles } from 'app/auth';
import i18next from 'i18next';

import en from './navigation-i18n/en';
import ru from './navigation-i18n/ru';

i18next.addResourceBundle('en_US', 'navigation', en);
i18next.addResourceBundle('rus', 'navigation', ru);

const navigationConfig = [
	{
		id: '1',
		en_US: 'Administration',
		rus: 'ADMINISTRATION',
		type: 'collapse',
		icon: 'admin_panel_settings',
		url: '/apps/dashboards/analytics',
		children: [
			{
				id: '13',
				en_US: 'Reports',
				rus: 'REPORTS',
				type: 'collapse',
				icon: 'assessment',
				url: '/administration/reports',
				children: [
					{
						id: '17',
						en_US: 'User Process',
						rus: 'USER_PROCESS',
						type: 'item',
						url: '/administration/reports/userprocess',
						
						icon: 'analytics'
					},
					{
						id: '18',
						en_US: 'User Progress',
						rus: 'USER_PROGRESS',
						type: 'item',
						url: '/administration/reports/userprogress',
						
						icon: 'analytics'
					}
				]
			},
			{
				id: '14',
				en_US: 'System',
				rus: 'SYSTEM',
				type: 'collapse',
				icon: 'verified_user',
				url: '/administration/system',
				children: [
					{
						id: '19',
						en_US: 'Users',
						rus: 'USERS',
						type: 'item',
						url: '/administration/system/users',
						//   auth: authRoles.privilege,
						icon: 'people'
					},
					{
						id: '20',
						en_US: 'New User',
						rus: 'NEW_USER',
						type: 'item',
						url: 'administration/system/new-user',
						auth: authRoles.privilege,
						icon: 'person_add'
					},

					{
						id: '22',
						en_US: 'System Access',
						rus: 'SYSTEM_ACCESS',
						type: 'item',
						url: 'administration/system/system-access',
						//  auth: authRoles.privilege,
						icon: 'person_add'
					},
					{
						id: '23',
						en_US: 'Address Types',
						rus: 'ADDRESS_TYPES',
						type: 'item',
						url: 'administration/system/address-types',
						auth: authRoles.privilege,
						icon: 'contact_mail'
					},
					{
						id: '24',
						en_US: 'Contact Types',
						rus: 'CONTACT_TYPES',
						type: 'item',
						url: 'administration/system/contact-types',
						//  auth: authRoles.privilege,
						icon: 'contact_support'
					},
					{
						id: '25',
						en_US: 'Locations',
						rus: 'LOCATIONS',
						type: 'item',
						url: 'administration/system/locations',
						auth: authRoles.privilege,
						icon: 'location_on'
					},
					{
						id: '26',
						en_US: 'Calendar',
						rus: 'CALENDAR',
						type: 'item',
						url: 'administration/system/calendar',
						auth: authRoles.privilege,
						icon: 'today'
					}
				]
			},
			{
				id: '15',
				en_US: 'Operational',
				rus: 'OPERATIONAL',
				type: 'collapse',
				icon: 'developer_board',
				url: '/administration/operational',
				children: [
					{
						id: 27,
						en_US: 'Booking cancel',
						rus: 'Booking_cancel',
						type: 'item',
						icon: 'today',
						url: 'administration/operational/bookingcancel',
						children: []
					},
					{
						id: 28,
						en_US: 'Amend Customer',
						rus: 'Amend_Customer',
						type: 'item',
						icon: 'today',
						url: 'administration/operational/amendcustomer',
						children: []
					},
					{
						id: 29,
						en_US: 'Amend Status',
						rus: 'Amend_Status',
						type: 'item',
						icon: 'today',
						url: 'administration/operational/amendstatus',
						children: []
					}
				]
			},
			{
				id: '16',
				en_US: 'Financial',
				rus: 'FINANCIAL',
				type: 'collapse',
				icon: 'account_balance',
				url: '/administration/financial',
				children: [
					{
						id: 30,
						title: 'MTG amendments',
						rus: 'MTG_amendments',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/mtgamendments',
						children: []
					},
					{
						id: 31,
						en_US: 'MTG Invoice remove',
						rus: 'MTG_Invoice_remove',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/mtginvoiceremove',
						children: []
					},
					{
						id: 32,
						en_US: 'Cancel link OOO MT',
						rus: 'Cancel_link_OOO_MT',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/cancellinkOOOMT',
						children: []
					},
					{
						id: 33,
						en_US: 'Delete Journal entry',
						rus: 'Delete_Journal_entry',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/deletejournalentry',
						children: []
					},
					{
						id: 34,
						en_US: 'Delete invoice A/P',
						rus: 'Delete_invoice_AP',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/deleteinvoiceAP',
						children: []
					},
					{
						id: 35,
						en_US: 'Balance sheet post',
						rus: 'Balance_sheet_post',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/balancesheetpost',
						children: []
					},
					{
						id: 36,
						en_US: 'Delete balance sheet post',
						rus: 'Delete_balance_sheet_post',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/deletebalancesheetpost',
						children: []
					},
					{
						id: 37,
						en_US: 'Delete invoice A/R',
						rus: 'Delete_invoice_AR',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/deleteinvoiceAR',
						children: []
					},
					{
						id: 38,
						en_US: 'Settlement cancel',
						rus: 'Settlement_cancel',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/settlementcancel',
						children: []
					},
					{
						id: 39,
						en_US: 'Statement automate',
						rus: 'Statement_automate',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/statementautomate',
						children: []
					},
					{
						id: 40,
						en_US: 'Year end post',
						rus: 'Year_end_post',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/yearendpost',
						children: []
					},
					{
						id: 41,
						en_US: ' MTG A/DeleteR - A/P',
						rus: 'Delete_MTG_AR_AP',
						type: 'item',
						icon: 'today',
						url: 'administration/financial/deleteMTGARAP',
						children: []
					}
				]
			}
		]
	},
	{
		id: 'library',
		en_US: 'Library',
		type: 'collapse',
		icon: 'local_library_icon',
		rus: 'LIBRARY',
		url: '/library',
		children: [
			{
				id: 'contacts',
				en_US: 'Contacts',
				type: 'item',
				icon: 'contacts',
				rus: 'CONTACTS',
				url: 'library/contacts',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			},
			{
				id: 'vesselSchedule',
				en_US: 'Vessel schedule',
				type: 'item',
				icon: 'assistant',
				rus: 'VESSEL_SCHEDULE',
				url: 'library/vesselSchedule',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			},
			{
				id: 'track_trace',
				en_US: 'Track & Trace',
				type: 'item',
				icon: 'assistant',
				rus: 'TRACK_TRACE',
				url: 'library/tracktrace',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			},
			{
				id: 'HS_code',
				en_US: 'HS Code',
				type: 'item',
				icon: 'assistant',
				rus: 'HS_CODE',
				url: '/library/hs-code',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			},
			{
				id: 'exchange_rate',
				en_US: 'Exchange Rate',
				type: 'item',
				icon: 'assistant',
				rus: 'EXCHANGE_RATE',
				url: 'library/exchangerate',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			},
			{
				id: 'location',
				en_US: 'Location',
				type: 'item',
				icon: 'location_on',
				rus: 'LOCATION',
				url: 'library/location',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			},
			{
				id: 'equipment_types',
				en_US: 'Equipment types',
				type: 'item',
				icon: 'assistant',
				rus: 'EQUIPMENT_TYPES',
				url: 'library/equipment_types',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			},
			{
				id: 'chart_of_accounts',
				en_US: 'Chart of Accounts',
				type: 'item',
				icon: 'account_balance',
				rus: 'CHART_OF_ACCOUNTS',
				url: 'library/chart_of_accounts',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			},
			{
				id: 'bank_details',
				en_US: 'Bank details',
				type: 'item',
				icon: 'money',
				rus: 'BANK_DETAILS',
				url: 'library/bank_details',
				auth: authRoles.privilege // ['admin', 'staff', 'user']
			}
		]
	},
	{
		id: 3,
		en_US: 'CSCustomer Service',
		rus: 'Customer_Service',
		type: 'collapse',
		icon: 'support_agent',
		url: '/customer_Service',
		children: [
			{
				id: 51,
				en_US: 'Posting inquiry',
				rus: 'Posting_inquiry',
				type: 'item',
				icon: 'post_add',
				url: 'customer_Service/Posting_inquiry',
				children: []
			},
			{
				id: 52,
				en_US: 'Inquiry in process',
				rus: 'Inquiry_in_process',
				type: 'item',
				icon: 'autorenew',
				url: 'customer_Service/Inquiry_in_process',
				children: []
			},
			{
				id: 53,
				en_US: 'Inquiries closed',
				rus: 'customer_Service',
				type: 'item',
				icon: 'event_busy',
				url: 'customer_Service/Inquiries_closed',
				children: []
			},
			{
				id: 54,
				en_US: 'Inquiries archive',
				rus: 'Inquiries_archive',
				type: 'item',
				icon: 'archive',
				url: 'customer_Service/Inquiries_archive',
				children: []
			}
		]
	},
	{
		id: 4,
		en_US: 'MDL-Purchasing department',
		rus: 'MDL_Purchasing_department',
		type: 'collapse',
		icon: 'shopping_basket',
		url: '/mdl_purchasing_department',
		children: [
			{
				id: 55,
				en_US: 'Tariffs',
				rus: 'Tariffs',
				type: 'item',
				icon: 'toll',
				url: 'mdl_purchasing_department/tariffs',
				children: []
			},
			{
				id: 56,
				en_US: 'Posting tariff',
				rus: 'Posting-tariff',
				type: 'item',
				icon: 'post_add',
				url: 'mdl_purchasing_department/Posting-tariff',
				children: []
			},
			{
				id: 57,
				en_US: 'Renew tariff',
				rus: 'Renew_tariff',
				type: 'item',
				icon: 'autorenew',
				url: 'mdl_purchasing_department/renew_tariff',
				children: []
			},
			{
				id: 58,
				en_US: 'Tariff request',
				rus: 'Tariff_request',
				type: 'item',
				icon: 'request_page',
				url: 'mdl_purchasing_department/tariff_request',
				children: []
			},
			{
				id: 59,
				en_US: 'Pending Request',
				rus: 'Pending-Request',
				type: 'item',
				icon: 'pending_actions',
				url: 'mdl_purchasing_department/pending-request',
				children: []
			},
			{
				id: 60,
				en_US: 'Tariffs archive',
				rus: 'Tariffs_archive',
				type: 'item',
				icon: 'archive',
				url: 'mdl_purchasing_department/tariffs_archive',
				children: []
			},
			{
				id: 61,
				en_US: 'Demurrage and detention',
				rus: 'Demurrage_and_detention',
				type: 'collapse',
				icon: 'local_police',
				url: 'mdl_purchasing_department/demurrage_and_detention',
				children: [
					{
						id: 62,
						en_US: 'Tariffs',
						translate: 'Tariffs',
						type: 'item',
						icon: 'toll',
						url: 'mdl_purchasing_department/demurrage_and_detention/tariffs',
						children: []
					},
					{
						id: 63,
						en_US: 'Posting tariff',
						rus: 'Posting_tariff',
						type: 'item',
						icon: 'post_add',
						url: 'mdl_purchasing_department/demurrage_and_detention/posting_tariff',
						children: []
					},
					{
						id: 64,
						en_US: 'Renew tariff',
						rus: 'Renew_tariff',
						type: 'item',
						icon: 'autorenew',
						url: 'mdl_purchasing_department/demurrage_and_detention/renew_tariff',
						children: []
					}
				]
			}
		]
	},
	{
		id: 5,
		en_US: 'COM - Sales department',
		rus: 'COM_Sales_department',
		type: 'collapse',
		icon: 'point_of_sale',
		url: '/com_sales_department',
		children: [
			{
				id: 65,
				en_US: 'Inquiries',
				rus: 'Inquiries',
				type: 'item',
				icon: 'connect_without_contact',
				url: 'com_sales_department/inquiries',
				children: []
			},
			{
				id: 66,
				en_US: 'Posting quotation',
				rus: 'Posting_quotation',
				type: 'item',
				icon: 'local_post_office',
				url: 'com_sales_department/posting_quotation',
				children: []
			},
			{
				id: 67,
				en_US: 'Quotation in process',
				rus: 'Quotation_in_process',
				type: 'item',
				icon: 'sync',
				url: 'com_sales_department/quotation_in_process',
				children: []
			},
			{
				id: 68,
				en_US: 'Posted quotations',
				rus: 'Posted_quotations',
				type: 'item',
				icon: 'mark_email_read',
				url: 'com_sales_department/posted_quotations',
				children: []
			},
			{
				id: 69,
				en_US: 'Quotations',
				rus: 'Quotations',
				type: 'item',
				icon: 'format_quote',
				url: 'com_sales_department/quotations',
				children: []
			},
			{
				id: 70,
				en_US: 'Bookings in process',
				rus: 'Bookings_in_process',
				type: 'item',
				icon: 'sync',
				url: 'com_sales_department/bookings_in_process',
				children: []
			},
			{
				id: 71,
				en_US: 'Confirmed bookings',
				rus: 'Confirmed_bookings',
				type: 'item',
				icon: 'beenhere',
				url: 'com_sales_department/confirmed_bookings',
				children: []
			},
			{
				id: 72,
				en_US: 'Vendor amendment',
				rus: 'Vendor_amendment',
				type: 'item',
				icon: 'elevator',
				url: 'com_sales_department/vendor_amendment',
				children: []
			},
			{
				id: 73,
				en_US: 'Additional expences',
				rus: 'Additional_expences',
				type: 'item',
				icon: 'request_quote',
				url: 'com_sales_department/additional_expences',
				children: []
			},
			{
				id: 74,
				en_US: 'Bookings amendment',
				rus: 'Bookings_amendment',
				type: 'item',
				icon: 'bookmark_added',
				url: 'com_sales_department/bookings_amendment',
				children: []
			},
			{
				id: 75,
				en_US: 'Quotations archive',
				rus: 'Quotations_archive',
				type: 'item',
				icon: 'archive',
				url: 'com_sales_department/quotations_archive',
				children: []
			}
		]
	},
	{
		id: 6,
		en_US: 'OPS - Operations department',
		rus: 'OPS_Operations_department',
		type: 'collapse',
		icon: 'developer_board',
		url: '/ops',
		children: [
			{
				id: 76,
				en_US: 'Bookings new',
				rus: 'Bookings_new',
				type: 'item',
				icon: 'book',
				url: 'ops/bookingsIndex/1',
				children: []
			},
			{
				id: 77,
				en_US: 'Bookings in process',
				rus: 'Bookings_in_process',
				type: 'item',
				icon: 'loop',
				url: 'ops/bookingsIndex/2',
				children: []
			},
			{
				id: 78,
				en_US: 'Process to complete',
				rus: 'Process_to_complete',
				type: 'item',
				icon: 'beenhere',
				url: 'ops/bookingsIndex/5',
				children: []
			},
			{
				id: 79,
				en_US: 'Dispute bookings',
				rus: 'Dispute_bookings',
				type: 'item',
				icon: 'bookmark_remove',
				url: 'ops/bookingsIndex/4',
				children: []
			},
			{
				id: 80,
				en_US: 'Сompleted',
				rus: 'Сompleted',
				type: 'item',
				icon: 'check_circle_outline',
				url: 'ops/bookingsIndex/3',
				children: []
			},
			{
				id: 81,
				en_US: 'Vendor amendment',
				rus: 'Vendor-amendment',
				type: 'item',
				icon: 'assignment_ind',
				url: 'ops/vendor-amendment',
				children: []
			},
			{
				id: 82,
				en_US: 'Demurrage and detention',
				rus: 'Demurrage_and_detention',
				type: 'collapse',
				icon: 'policy',
				url: 'ops/demurrage_and_detention',
				children: [
					{
						id: 83,
						title: 'Tariffs',
						rus: 'Tariffs',
						type: 'item',
						icon: 'toll',
						url: 'ops/demurrage_and_detention/tariffs',
						children: []
					}
				]
			}
		]
	},
	{
		id: 7,
		en_US: 'FIN - Finance department',
		rus: 'FIN_Finance_department',
		type: 'collapse',
		icon: 'account_balance',
		url: '/fIN_finance_department',
		children: [
			{
				id: 84,
				en_US: 'MTL',
				rus: 'MTL',
				type: 'collapse',
				icon: 'ballot',
				url: 'fIN_finance_department/mtl',
				children: [
					{
						id: 90,
						en_US: 'Journal Entry',
						rus: 'Journal_Entry',
						type: 'item',
						icon: 'description',
						url: 'fIN_finance_department/mtl/journal-entry',
						children: []
					},
					{
						id: 91,
						en_US: 'AR-Invoice posting',
						rus: 'AR_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mtl/ar-invoice-posting',
						children: []
					},
					{
						id: 92,
						en_US: ' AR-Invoice in process',
						rus: 'AR-Invoice-in-process',
						type: 'item',
						icon: 'loop',
						url: 'fIN_finance_department/mtl/ar-invoice-in-process',
						children: []
					},
					{
						id: 93,
						en_US: 'AR - Invoice Complete',
						rus: 'AR_Invoice_Complete',
						type: 'item',
						icon: 'event_available',
						url: 'fIN_finance_department/mtl/ar-invoice-complete',
						children: []
					},
					{
						id: 94,
						en_US: 'AP - Invoice posting',
						rus: 'AP_Invoice_posting',
						type: 'item',
						icon: 'local_post_office',
						url: 'fIN_finance_department/mtl/ap-invoice-posting',
						children: []
					},
					{
						id: 95,
						en_US: ' Payment Settlement',
						rus: 'Payment_Settlement',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mtl/payment-settlement',
						children: []
					},
					{
						id: 96,
						en_US: 'Payment Schedule',
						rus: 'Payment_Schedule',
						type: 'item',
						icon: 'event_note',
						url: 'fIN_finance_department/mtl/payment-schedule',
						children: []
					},
					{
						id: 97,
						en_US: 'MTCS LKA IC',
						rus: 'MTCS_LKA_IC',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mtl/mtcs-lka-ic',
						children: []
					},
					{
						id: 98,
						en_US: 'MTCS LKA IV',
						rus: 'MTCS_LKA_IV',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mtl/mtcs-lka-IV',
						children: []
					}
				]
			},
			{
				id: 85,
				en_US: 'MTOOO',
				rus: 'MTOOO',
				type: 'collapse',
				icon: 'ballot',
				url: 'fIN_finance_department/mtooo',
				children: [
					{
						id: 99,
						en_US: 'Journal Entry',
						rus: 'Journal_Entry',
						type: 'item',
						icon: 'description',
						url: 'fIN_finance_department/mtooo/journal-entry',
						children: []
					},
					{
						id: 100,
						en_US: 'AR - Invoice posting',
						rus: 'AR_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mtooo/ar-invoice-posting',
						children: []
					},
					{
						id: 101,
						en_US: 'AR -Invoice in process',
						rus: 'AR_Invoice_in_process',
						type: 'item',
						icon: 'loop',
						url: 'fIN_finance_department/mtooo/ar-invoice-in-process',
						children: []
					},
					{
						id: 102,
						en_US: 'AR - Invoice Complete',
						rus: 'AR_Invoice_Complete',
						type: 'item',
						icon: 'event_available',
						url: 'fIN_finance_department/mtooo/ar-invoice-complete',
						children: []
					},
					{
						id: 103,
						en_US: 'AP - Invoice posting',
						rus: 'AP_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mtooo/ap-invoice-posting',
						children: []
					},
					{
						id: 104,
						en_US: 'Payment Settlement',
						rus: 'Payment_Settlement',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mtooo/payment-settlement',
						children: []
					},
					{
						id: 105,
						en_US: 'Payment Schedule',
						rus: 'Payment_Schedule',
						type: 'item',
						icon: 'event_note',
						url: 'fIN_finance_department/mtooo/payment-schedule',
						children: []
					},
					{
						id: 106,
						en_US: 'MTCS MTOOO IC',
						rus: 'MTCS_MTOOO_IC',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mtooo/mtcs-mtooo-ic',
						children: []
					},
					{
						id: 107,
						en_US: 'MTCS MTOOO IV',
						rus: 'MTCS_MTOOO_IV',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mtooo/mtcs-mtooo-IV',
						children: []
					}
				]
			},
			{
				id: 86,
				en_US: 'MTGL',
				rus: 'MTGL',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'fIN_finance_department/mtgl',
				children: [
					{
						id: 114,
						en_US: 'Journal Entry',
						rus: 'Journal_Entry',
						type: 'item',
						icon: 'description',
						url: 'fIN_finance_department/mtgl/journal-entry',
						children: []
					},
					{
						id: 115,
						en_US: 'AR - Invoice posting',
						rus: 'AR_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mtgl/ar-invoice-posting',
						children: []
					},
					{
						id: 116,
						en_US: 'AR -Invoice in process',
						rus: 'AR_Invoice_in_process',
						type: 'item',
						icon: 'loop',
						url: 'fIN_finance_department/mtgl/ar-invoice-in-process',
						children: []
					},
					{
						id: 117,
						en_US: 'AR - Invoice Complete',
						rus: 'AR_Invoice_Complete',
						type: 'item',
						icon: 'event_available',
						url: 'fIN_finance_department/mtgl/ar-invoice-complete',
						children: []
					},
					{
						id: 118,
						en_US: 'AP - Invoice posting',
						rus: 'AP_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mtgl/ap-invoice-posting',
						children: []
					},
					{
						id: 119,
						en_US: 'Payment Settlement',
						rus: 'Payment_Settlement',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mtgl/payment-settlement',
						children: []
					},
					{
						id: 120,
						en_US: 'Payment Schedule',
						rus: 'Payment_Schedule',
						type: 'item',
						icon: 'event_note',
						url: 'fIN_finance_department/mtgl/payment-schedule',
						children: []
					},
					{
						id: 121,
						en_US: 'MTCS MTGL IC',
						rus: 'MTCS_MTGL_IC',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mtgl/mtcs-mtgl-ic',
						children: []
					},
					{
						id: 122,
						en_US: 'MTCS MTGL IV',
						rus: 'MTCS_MTGL_IV',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mtgl/mtcs-mtgl-IV',
						children: []
					}
				]
			},
			{
				id: 87,
				en_US: 'MTECO',
				rus: 'MTECO',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'fIN_finance_department/mteco',

				children: [
					{
						id: 129,
						en_US: 'Journal Entry',
						rus: 'Journal_Entry',
						type: 'item',
						icon: 'description',
						url: 'fIN_finance_department/mteco/journal-entry',
						children: []
					},
					{
						id: 130,
						en_US: 'AR - Invoice posting',
						rus: 'AR_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mteco/ar-invoice-posting',
						children: []
					},
					{
						id: 131,
						en_US: 'AR -Invoice in process',
						rus: 'AR_Invoice_in_process',
						type: 'item',
						icon: 'loop',
						url: 'fIN_finance_department/mteco/ar-invoice-in-process',
						children: []
					},
					{
						id: 132,
						en_US: 'AR - Invoice Complete',
						rus: 'AR_Invoice_Complete',
						type: 'item',
						icon: 'event_available',
						url: 'fIN_finance_department/mteco/ar-invoice-complete',
						children: []
					},
					{
						id: 133,
						en_US: 'AP - Invoice posting',
						rus: 'AP_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mteco/ap-invoice-posting',
						children: []
					},
					{
						id: 134,
						en_US: 'Payment Settlement',
						rus: 'Payment_Settlement',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mteco/payment-settlement',
						children: []
					},
					{
						id: 135,
						en_US: 'Payment Schedule',
						rus: 'Payment_Schedule',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mteco/payment-schedule',
						children: []
					},
					{
						id: 136,
						en_US: 'MTCS ECO IC',
						rus: 'MTCS_LKA_IC',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mteco/mtcs-eco-ic',
						children: []
					},
					{
						id: 137,
						en_US: 'MTCS ECO IV',
						rus: 'MTCS_ECO_IV',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mteco/mtcs-mtgl-IV',
						children: []
					}
				]
			},
			{
				id: 88,
				en_US: 'MTAVAN',
				rus: 'MTAVAN',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'fIN_finance_department/mtavan',
				children: [
					{
						id: 144,
						en_US: 'Journal Entry',
						rus: 'Journal_Entry',
						type: 'item',
						icon: 'description',
						url: 'fIN_finance_department/mtavan/journal-entry',
						children: []
					},
					{
						id: 145,
						en_US: 'AR - Invoice posting',
						rus: 'AR_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mtavan/ar-invoice-posting',
						children: []
					},
					{
						id: 146,
						en_US: 'AR -Invoice in process',
						rus: 'AR_Invoice_in_process',
						type: 'item',
						icon: 'loop',
						url: 'fIN_finance_department/mtavan/payment-settlement',
						children: []
					},
					{
						id: 147,
						en_US: 'AR - Invoice Complete',
						rus: 'AR_Invoice_Complete',
						type: 'item',
						icon: 'event_available',
						url: 'fIN_finance_department/mtavan/payment-schedule',
						children: []
					},
					{
						id: 148,
						en_US: 'AP - Invoice posting',
						rus: 'AP_Invoice_posting',
						type: 'item',
						icon: 'event_available',
						url: 'fIN_finance_department/mtavan/ap-invoice-posting',
						children: []
					},
					{
						id: 149,
						en_US: 'Payment Settlement',
						rus: 'Payment_Settlement',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mtavan/payment-settlement',
						children: []
					},
					{
						id: 150,
						en_US: 'Payment Schedule',
						rus: 'Payment_Schedule',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mtavan/payment-schedule',
						children: []
					},
					{
						id: 151,
						en_US: 'MTSC AVAN IC',
						rus: 'MTCS_AVAN_IC',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mtavan/mtcs-avan-ic',
						children: []
					},
					{
						id: 152,
						en_US: 'MTCS AVAN IV',
						rus: 'MTCS_AVAN_IV',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mtavan/mtcs-avan-IV',
						children: []
					}
				]
			},
			{
				id: 89,
				en_US: 'MTTRADE',
				rus: 'MTTRADE',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'fIN_finance_department/mttrade',
				children: [
					{
						id: 159,
						en_US: 'Journal Entry',
						rus: 'Journal_Entry',
						type: 'item',
						icon: 'description',
						url: 'fIN_finance_department/mttrade/journal-entry',
						children: []
					},
					{
						id: 160,
						en_US: 'AR - Invoice posting',
						rus: 'AR_Invoice_posting',
						type: 'item',
						icon: 'event_available',
						url: 'fIN_finance_department/mttrade/ar-invoice-posting',
						children: []
					},
					{
						id: 161,
						en_US: 'AR -Invoice in process',
						rus: 'AR_Invoice_in_process',
						type: 'item',
						icon: 'loop',
						url: 'fIN_finance_department/mttrade/ar-invoice-inprocess',
						children: []
					},
					{
						id: 162,
						en_US: 'AR - Invoice Complete',
						rus: 'AR_Invoice_Complete',
						type: 'item',
						icon: 'event_available',
						url: 'fIN_finance_department/mttrade/ar-invoice-complete',
						children: []
					},
					{
						id: 163,
						en_US: 'AP - Invoice posting',
						rus: 'AP_Invoice_posting',
						type: 'item',
						icon: 'receipt',
						url: 'fIN_finance_department/mttrade/ap-invoice-posting',
						children: []
					},
					{
						id: 164,
						en_US: 'Payment Settlement',
						rus: 'Payment_Settlement',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mttrade/payment-settlement',
						children: []
					},
					{
						id: 165,
						en_US: 'Payment Schedule',
						rus: 'Payment_Schedule',
						type: 'item',
						icon: 'payment',
						url: 'fIN_finance_department/mttrade/payment-schedule',
						children: []
					},
					{
						id: 166,
						en_US: 'MTCS TRADE IC',
						rus: 'MTCS_TRADE_IC',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mttrade/mtcs-trade-ic',
						children: []
					},
					{
						id: 167,
						en_US: 'MTCS TRADE IV',
						rus: 'MTCS_TRADE_IV',
						type: 'item',
						icon: 'view_compact_alt',
						url: 'fIN_finance_department/mttrade/mtcs-trade-IV',
						children: []
					}
				]
			}
		]
	},
	{
		id: 8,
		en_US: 'GW - Gateway department',
		rus: 'GW_Gateway_department',
		type: 'collapse',
		icon: 'room_preferences',
		url: '/gw-gateway-department',
		children: []
	},
	{
		id: 9,
		en_US: 'Dashboards',
		rus: 'Dashboards',
		type: 'collapse',
		icon: 'dashboard',
		url: '/dashboard',
		children: []
	},
	{
		id: 10,
		en_US: 'Reports',
		rus: 'Reports',
		type: 'collapse',
		icon: 'assessment',
		url: '/reports',
		children: [
			{
				id: 174,
				en_US: 'CS-Inquiries',
				rus: 'CS_Inquiries',
				type: 'item',
				icon: 'history_edu',
				url: 'reports/cs-inquiries',
				children: []
			},
			{
				id: 175,
				en_US: 'MDL - Tariffs',
				rus: 'MDL_Tariffs',
				type: 'item',
				icon: 'view_compact_alt',
				url: 'reports/mdl-tariffs',
				children: []
			},
			{
				id: 176,
				en_US: 'COM - Quotations',
				rus: 'COM_Quotations',
				type: 'item',
				icon: 'view_compact_alt',
				url: 'reports/com-quotations',
				children: []
			},
			{
				id: 177,
				en_US: 'Tracking',
				rus: 'Tracking',
				type: 'collapse',
				icon: 'share_location',
				url: 'reports/tracking',
				children: [
					{
						id: 178,
						en_US: 'By customer',
						rus: 'By_customer',
						type: 'item',
						icon: 'person',
						url: 'reports/tracking/by-customer',
						children: []
					},
					{
						id: 179,
						en_US: 'By vendor',
						rus: 'By_vendor',
						type: 'item',
						icon: 'person4',
						url: 'reports/tracking/by_vendor',
						children: []
					}
				]
			}
		]
	},
	{
		id: 11,
		en_US: 'Accounting reports',
		rus: 'Accounting_reports',
		type: 'collapse',
		icon: 'account_balance_wallet',
		url: '/accounting-reports',
		children: [
			{
				id: 180,
				en_US: 'MTL',
				rus: 'MTL',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'accounting-reports/mtl',
				children: []
			},
			{
				id: 181,
				en_US: 'MTOOO',
				rus: 'MTOOO',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'accounting-reports/mtooo',
				children: []
			},
			{
				id: 182,
				en_US: 'MTGL',
				rus: 'MTGL',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'accounting-reports/mtgl',
				children: []
			},
			{
				id: 183,
				en_US: 'MTECO',
				rus: 'MTECO',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'accounting-reports/mteco',
				children: []
			},
			{
				id: 184,
				en_US: 'MTAVAN',
				rus: 'MTAVAN',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'accounting-reports/mtavan',
				children: []
			},
			{
				id: 185,
				en_US: 'MTTRADE',
				rus: 'MTTRADE',
				type: 'collapse',
				icon: 'view_compact_alt',
				url: 'accounting-reports/mttrade',
				children: []
			}
		]
	},
	{
		id: 12,
		en_US: 'Recycle Bin',
		rus: 'Recycle_Bin',
		type: 'collapse',
		icon: 'delete_forever',
		url: '/recyclebin',
		children: [
			{
				id: 201,
				en_US: 'Tariffs',
				rus: 'Tariffs',
				type: 'item',
				icon: 'toll',
				url: 'recyclebin/tariffs',
				children: []
			},
			{
				id: 202,
				en_US: 'Inquiries',
				rus: 'Inquiries',
				type: 'item',
				icon: 'connect_without_contact',
				url: 'recyclebin/inquiries',
				children: []
			},
			{
				id: 203,
				en_US: 'Quotations',
				rus: 'Quotations',
				type: 'Items',
				icon: 'format_quote',
				url: 'recyclebin/quotations',
				children: []
			}
		]
	}
];

export default navigationConfig;
