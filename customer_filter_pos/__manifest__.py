# -*- coding: utf-8 -*-
{
    'name': "Customer filter for POS",
    'summary': """
        Module to display customers based on filter.""",
    'description': """
        This module allows user to display customers which are not having any child partners.""",
    'version': '11.0.1.0.0',
    'author': "Aktiv Software",
    'website': "http://www.aktivsoftware.com",
    'category': 'Point Of Sale',
    'depends': ['point_of_sale'],
    'data': [
        'views/templates.xml'
    ],
    'images': [
        'static/description/banner.jpg',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}
