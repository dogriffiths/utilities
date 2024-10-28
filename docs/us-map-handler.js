// us-map-handler.js
import { stateProperties } from './state-data.js';

export class USMapHandler {
     constructor(svgId, sidebarId) {
        this.svg = d3.select(svgId);
        this.g = this.svg.append('g');
        this.active = d3.select(null);
        this.sidebarId = sidebarId;
        this.counties = null;
        this.states = null;
        this.isDarkMode = false;
        
        this.projection = d3.geoAlbersUsa()
            .scale(1300)
            .translate([500, 300]);
            
        this.path = d3.geoPath()
            .projection(this.projection);
            
        // Bind methods
        this.clicked = this.clicked.bind(this);
        this.reset = this.reset.bind(this);
        this.updateSidebar = this.updateSidebar.bind(this);
        this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }

    async initialize() {
        try {
            // Load both states and counties data
            const us = await d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
            const counties = await d3.json('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json');
            
            this.states = topojson.feature(us, us.objects.states);
            this.counties = topojson.feature(counties, counties.objects.counties);
            
            // Create groups for states and counties
            this.countyGroup = this.g.append('g')
                .attr('class', 'counties')
                .style('opacity', 0);
                
            this.stateGroup = this.g.append('g')
                .attr('class', 'states');
            
            // Draw states
            this.stateGroup.selectAll('path')
                .data(this.states.features)
                .enter()
                .append('path')
                .attr('d', this.path)
                .attr('class', 'state')
                .on('click', this.clicked);
                
            // Draw counties (initially hidden)
            this.countyGroup.selectAll('path')
                .data(this.counties.features)
                .enter()
                .append('path')
                .attr('d', this.path)
                .attr('class', 'county')
                .style('display', 'none');
                
            this.svg.on('click', this.reset);
            
            // Add CSS for counties
            const style = document.createElement('style');
            style.textContent = `
                .county {
                    fill: #ddd;
                    stroke: #fff;
                    stroke-width: 0.5;
                    transition: fill 0.3s;
                }
                .county:hover {
                    fill: #bbb;
                }
            `;
            document.head.appendChild(style);
            
        } catch (error) {
            console.error('Error loading map:', error);
        }
    }


    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        
        // Toggle dark mode class on body
        document.body.classList.toggle('dark-mode');
        
        // Update button icon
        const darkModeBtn = document.getElementById('dark-mode-btn');
        darkModeBtn.innerHTML = this.isDarkMode ? '&#9728;' : '&#127769;';
        darkModeBtn.title = this.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
    
    updateSidebar(d) {
        const sidebar = document.getElementById(this.sidebarId);
        const stateId = d.id;
        const stateInfo = stateProperties[stateId];
        
        if (stateInfo) {
            document.querySelector('.state-name').textContent = stateInfo.name;
            document.querySelector('.population').textContent = stateInfo.population.toLocaleString();
            document.querySelector('.density').textContent = stateInfo.density;
            document.querySelector('.capital').textContent = stateInfo.capital;
            document.querySelector('.largest-city').textContent = stateInfo.largestCity;
            sidebar.classList.add('active');
        }
    }
    
    clicked(event, d) {
        event.stopPropagation();
        
        if (this.active.node() === event.currentTarget) {
            return this.reset();
        }
        
        this.active.classed('active', false);
        this.active = d3.select(event.currentTarget).classed('active', true);
        
        this.updateSidebar(d);
        
        const bounds = this.path.bounds(d);
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        const scale = 0.9 / Math.max(dx / 1000, dy / 600);
        const translate = [500 - scale * x, 300 - scale * y];
        
        // Show counties for the selected state
        const stateId = d.id;
        const stateCounties = this.counties.features.filter(county => 
            county.id.substring(0, 2) === stateId
        );
        
        this.countyGroup.selectAll('path')
            .style('display', function(d) {
                return d.id.substring(0, 2) === stateId ? 'block' : 'none';
            });
            
        // Fade out states and fade in counties
        this.stateGroup.transition()
            .duration(750)
            .style('opacity', 0.3);
            
        this.countyGroup.transition()
            .duration(750)
            .style('opacity', 1);
        
        // Transform the view
        this.g.transition()
            .duration(750)
            .style('stroke-width', 1.5 / scale + 'px')
            .attr('transform', `translate(${translate})scale(${scale})`);
    }
    
    reset() {
        this.active.classed('active', false);
        this.active = d3.select(null);
        
        document.getElementById(this.sidebarId).classList.remove('active');
        
        // Hide counties and show states
        this.stateGroup.transition()
            .duration(750)
            .style('opacity', 1);
            
        this.countyGroup.transition()
            .duration(750)
            .style('opacity', 0);
        
        this.g.transition()
            .duration(750)
            .style('stroke-width', '1px')
            .attr('transform', '');
    }
    
    getSVGElement() {
        return this.svg.node();
    }
    
    getGroupElement() {
        return this.g.node();
    }
}
